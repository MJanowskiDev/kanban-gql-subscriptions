import { DraggableProvidedDraggableProps } from "react-beautiful-dnd";

import { CSSProperties, SetStateAction } from "react";

export interface ListItems {
  id: string;
  content: string;
}

export interface ColumnsType {
  id: string;
  name: string;
  cards: ListItems[];
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

export const dummyState = [
  {
    name: "First column",
    id: "c963631d-a04d-4a29-9455-ca89440e68f8",
    cards: [
      {
        id: "d9903f13-2380-4666-8531-0eecdd9cf67e",
        content: "First card",
      },
      {
        id: "6885abfc-8e8f-466e-94bf-a7450d58c7b4",
        content: "Second card",
      },
    ],
  },
  {
    name: "Second column",
    id: "a8e65bc9-9ad1-499b-9a4f-bdcf5293a448",
    cards: [
      {
        id: "d4418ca4-6070-4204-8c04-52e6bbc1ba7b",
        content: "Third card",
      },
    ],
  },
  {
    name: "Third column",
    id: "410d49f0-88d9-4704-b5c7-efd4587fd7ae",
    cards: [],
  },
];
