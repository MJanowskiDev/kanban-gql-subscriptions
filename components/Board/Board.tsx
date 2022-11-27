import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { reorder, getListStyle, ColumnsType } from "./utils";
import { Card } from "./Card";
import { Column } from "./Column";
import {
  BoardSubscriptionDocument,
  BoardSubscriptionSubscription,
  useCreateCardMutation,
  useCreateColumnMutation,
  useDeleteCardMutation,
  useEditCardColumnMutation,
} from "../../graphql/generated/gql-types";

import { useSubscription } from "@apollo/client";

export const Board = () => {
  const [columns, setColumns] = useState<ColumnsType[]>([]);

  const { loading, data, error } =
    useSubscription<BoardSubscriptionSubscription>(BoardSubscriptionDocument);

  const [createColumn, createColumnResult] = useCreateColumnMutation();
  const [createCard, createCardResult] = useCreateCardMutation();
  const [removeCard, removeCardResult] = useDeleteCardMutation();
  const [editCardColumn, editCardColumnResult] = useEditCardColumnMutation();

  useEffect(() => {
    if (data) {
      setColumns(data.columns);
    }
  }, [data]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        columns[sInd].cards,
        source.index,
        destination.index
      );
      const newState = [...columns];
      newState[sInd].cards = items;
      setColumns(newState);
    } else {
      await editCardColumn({
        variables: {
          columnId: columns[dInd].id,
          id: columns[sInd].cards[source.index].id,
        },
      });
    }
  };

  const handleCardRemove = (cardId: string) => {
    removeCard({ variables: { id: cardId } });
  };

  const handleAddItem = (columnId: string) => {
    createCard({ variables: { columnId: columnId, content: uuidv4() } });
  };

  const handleAddColumn = () => {
    createColumn({ variables: { name: uuidv4().slice(0, 5) } });
  };

  return (
    <div>
      <button type="button" onClick={handleAddColumn}>
        Add new column
      </button>

      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((el, ind) => (
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
                          columnId={el.id}
                          rowId={index}
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
    </div>
  );
};
