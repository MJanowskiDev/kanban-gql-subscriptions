import { v4 as uuidv4 } from "uuid";
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
  BoardSubscriptionDocument,
  BoardSubscriptionSubscription,
  useCreateCardMutation,
  useCreateColumnMutation,
  useDeleteCardMutation,
  useEditCardColumnMutation,
  useEditCardOrderMutation,
} from "../../graphql/generated/gql-types";

import { useSubscription } from "@apollo/client";

export const Board = () => {
  const { loading, data, error } =
    useSubscription<BoardSubscriptionSubscription>(BoardSubscriptionDocument);

  const [createColumn, createColumnResult] = useCreateColumnMutation();
  const [createCard, createCardResult] = useCreateCardMutation();
  const [removeCard, removeCardResult] = useDeleteCardMutation();
  const [editCardColumn, editCardColumnResult] = useEditCardColumnMutation();
  const [editCardOrder, editCardOrderResult] = useEditCardOrderMutation();

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
        editCardOrder({
          variables: {
            id: data?.columns[sInd].cards[source.index].id,
            order: calculateOrder(cardsList, destination.index, cardOrder),
          },
        });
      }
    } else {
      const cardsList = data?.columns[dInd].cards.slice(0);

      const columnId = data?.columns[dInd].id;
      const cardId = data?.columns[sInd].cards[source.index]?.id;
      if (cardsList && columnId && cardId) {
        editCardColumn({
          variables: {
            columnId: columnId,
            id: cardId,
            order: calculateCardOrderInColum(cardsList, destination.index),
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
