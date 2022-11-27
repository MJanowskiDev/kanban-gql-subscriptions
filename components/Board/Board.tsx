import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";

import { ListItems, reorder, getListStyle, ColumnsType } from "./utils";
import { Card } from "./Card";
import { Column } from "./Column";

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: ListItems[],
  destination: ListItems[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): ListItems[][] => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  const result: ListItems[][] = [];

  if (droppableDestination && droppableSource) {
    destClone.splice(droppableDestination.index, 0, removed);
  }

  const x = Number(droppableSource.droppableId);
  const y = Number(droppableDestination.droppableId);

  result[x] = sourceClone;
  result[y] = destClone;

  return result;
};

export const Board = () => {
  const [columns, setColumns] = useState<ColumnsType[]>([]);

  console.log(columns);

  const onDragEnd = (result: DropResult) => {
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
      const result = move(
        columns[sInd].cards,
        columns[dInd].cards,
        source,
        destination
      );
      const newState = [...columns];
      newState[sInd].cards = result[sInd];
      newState[dInd].cards = result[dInd];

      setColumns(newState);
    }
  };

  const handleCardRemove = (columnId: string, rowIndex: number) => {
    console.log(rowIndex, columnId);
    const columnsCopy = [...columns];
    const columnIndex = columnsCopy.findIndex((col) => col.id === columnId);

    columnsCopy[columnIndex].cards.splice(rowIndex, 1);

    setColumns(columnsCopy);
  };

  const handleAddItem = (columnId: string) => {
    const columnsCopy = [...columns];
    const columnIndex = columnsCopy.findIndex((col) => col.id === columnId);
    if (typeof columnIndex !== undefined) {
      columnsCopy[columnIndex].cards = [
        ...columnsCopy[columnIndex].cards,
        { id: uuidv4(), content: uuidv4() },
      ];
    }
    setColumns(columnsCopy);
  };

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      { id: uuidv4(), name: uuidv4().slice(0, 5), cards: [] },
    ]);
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
