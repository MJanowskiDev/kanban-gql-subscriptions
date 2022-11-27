import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";

import { ListItems, getItemStyle, reorder, getListStyle } from "./utils";
import { Card } from "./Card";
import { Column } from "./Column";

// fake data generator
const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

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
  const [state, setState] = useState<ListItems[][]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  };

  const cardRemove = (columnIndex: number, rowIndex: number) => {
    const newState = [...state];
    newState[columnIndex].splice(rowIndex, 1);
    setState(newState);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>

      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <Column
                  divRef={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  droppableProps={{ ...provided.droppableProps }}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          provided={provided}
                          snapshot={snapshot}
                          cardRemoveHandle={cardRemove}
                          columnId={ind}
                          rowId={index}
                          item={item}
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
