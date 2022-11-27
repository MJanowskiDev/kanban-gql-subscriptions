import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  DropResult,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

import { CSSProperties, SetStateAction } from "react";

export interface ListItems {
  id: string;
  content: string;
}

const GRID = 8;

export const getItemStyle = (
  isDragging: Boolean,
  draggableStyle: DraggableProvidedDraggableProps["style"]
): CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: GRID,
  width: 250,
});

export const reorder = (
  list: ListItems[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
