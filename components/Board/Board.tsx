import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import {
  getListStyle,
  calculateOrder,
  calculateCardOrderInColum,
  ORDER_THRESHOLD_NEW_VALUE,
} from "./utils";

import { Card } from "./Card";
import { Column } from "./Column";
import {
  BoardSubscriptionSubscription,
  useCreateCardMutation,
  useCreateColumnMutation,
  useDeleteCardMutation,
  useEditCardColumnMutation,
  useEditCardOrderMutation,
  BoardSubscriptionQueryDocument,
} from "../../graphql/generated/gql-types";

import { useHasuraSubscriptionWithCache } from "../../hooks/useSubscriptionWithCache";

export const Board = () => {
  const query = useHasuraSubscriptionWithCache<BoardSubscriptionSubscription>(
    BoardSubscriptionQueryDocument
  );
  const data = query.data;

  const [createColumn, createColumnResult] = useCreateColumnMutation();
  const [createCard, createCardResult] = useCreateCardMutation();
  const [removeCard, removeCardResult] = useDeleteCardMutation();
  const [editCardColumn, editCardColumnResult] = useEditCardColumnMutation({
    update(cache, result) {
      const originalData = cache.readQuery<BoardSubscriptionSubscription>({
        query: BoardSubscriptionQueryDocument,
      });

      if (
        originalData?.columns &&
        result.data?.edit_card_column &&
        result.data.edit_card_column?.returning
      ) {
        const columns = [...originalData?.columns];
        const updatedCard = result.data?.edit_card_column.returning[0];
        const { columnId, order, id, content } = updatedCard;
        console.log(order, "order");

        const sourceColumnId = columns.findIndex((column) =>
          column.cards.find((card) => card.id === id)
        );

        const destinationColumnId = columns.findIndex(
          (column) => column.id == columnId
        );

        const res = columns.map((column, idx) => {
          if (idx === sourceColumnId) {
            return {
              ...column,
              cards: column.cards.filter((card) => card.id !== id),
            };
          }
          if (idx === destinationColumnId) {
            return {
              ...column,
              cards: [
                ...column.cards,
                { ...updatedCard, columnId: columnId, order: order },
              ].sort((a, b) => (a.order > b.order ? 1 : -1)),
            };
          }
          return { ...column };
        });

        cache.writeQuery({
          query: BoardSubscriptionQueryDocument,
          data: { columns: res },
        });
      }
    },
  });
  const [editCardOrder, editCardOrderResult] = useEditCardOrderMutation({
    update(cache, result) {
      const originalData = cache.readQuery<BoardSubscriptionSubscription>({
        query: BoardSubscriptionQueryDocument,
      });

      if (
        originalData?.columns &&
        result.data?.update_card &&
        result.data.update_card?.returning
      ) {
        const { id, columnId, order } = result.data?.update_card.returning[0];
        cache.writeQuery({
          query: BoardSubscriptionQueryDocument,
          data: {
            columns: originalData.columns.map((column) =>
              column.id === columnId
                ? {
                    ...column,
                    cards: column.cards
                      .map((card) =>
                        card.id === id
                          ? {
                              ...card,
                              order: order,
                            }
                          : card
                      )
                      .sort((a, b) => (a.order > b.order ? 1 : -1)),
                  }
                : column
            ),
          },
        });
      }
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const cardsList = data?.columns[sInd].cards.slice(0);
      const cardOrder = data?.columns[sInd].cards[destination.index].order;

      if (cardsList) {
        const card = data?.columns[sInd].cards[source.index];
        if (card) {
          editCardOrder({
            variables: {
              id: data?.columns[sInd].cards[source.index].id,
              order: calculateOrder(cardsList, destination.index, cardOrder),
            },
            optimisticResponse: {
              __typename: "mutation_root",
              update_card: {
                __typename: "card_mutation_response",
                returning: [
                  {
                    __typename: "card",
                    id: card?.id,
                    order: calculateOrder(
                      cardsList,
                      destination.index,
                      cardOrder
                    ),
                    columnId: data?.columns[sInd].id,
                    content: card.content,
                  },
                ],
              },
            },
          });
        }
      }
    } else {
      const cardsList = data?.columns[dInd].cards.slice(0);

      const columnId = data?.columns[dInd].id;
      const cardId = data?.columns[sInd].cards[source.index]?.id;
      const card = data?.columns[sInd].cards[source.index];
      const updatedOrder = calculateCardOrderInColum(
        cardsList,
        destination.index
      );
      if (cardsList && columnId && cardId && card) {
        editCardColumn({
          variables: {
            columnId: columnId,
            id: cardId,
            order: updatedOrder,
          },
          optimisticResponse: {
            __typename: "mutation_root",
            edit_card_column: {
              __typename: "card_mutation_response",
              returning: [
                {
                  __typename: "card",
                  content: card.content,
                  id: cardId,
                  columnId: columnId,
                  order: updatedOrder,
                },
              ],
            },
          },
        });
      }
    }
  };

  const handleCardRemove = (cardId: string) => {
    removeCard({ variables: { id: cardId } });
  };

  const handleAddItem = (columnId: string) => {
    const cards = data?.columns.find((col) => col.id === columnId)?.cards;
    let maxOrder = 0;
    if (cards?.length) {
      const sortedCardsByOrder = cards.reduce((prev, current) => {
        return prev.order > current.order ? prev : current;
      });

      maxOrder = sortedCardsByOrder.order + ORDER_THRESHOLD_NEW_VALUE;
    }

    createCard({
      variables: { columnId: columnId, content: "", order: maxOrder },
    });
  };

  const handleAddColumn = () => {
    createColumn({ variables: { name: "Column" } });
  };

  return (
    <div>
      <div style={{ display: "flex", overflow: "auto", width: "100vw" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {data?.columns.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <Column
                  id={el.id}
                  handleAddItem={handleAddItem}
                  divRef={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  droppableProps={{ ...provided.droppableProps }}
                  name={el.name}
                >
                  {el.cards.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          provided={provided}
                          snapshot={snapshot}
                          cardRemoveHandle={handleCardRemove}
                          item={item}
                          name={el.name}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <br></br>
      <button type="button" onClick={handleAddColumn}>
        Add new column
      </button>
    </div>
  );
};
