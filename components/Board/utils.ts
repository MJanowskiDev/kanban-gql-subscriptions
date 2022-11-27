import { DraggableProvidedDraggableProps } from "react-beautiful-dnd";
import { Card } from "../../graphql/generated/gql-types";
import { CSSProperties } from "react";

export interface ListItems {
  id: string;
  content: string;
  order: number;
}

export interface ColumnsType {
  id: string;
  name: string;
  cards: ListItems[];
}
const GRID = 8;
const ORDER_THRESHOLD_UPDATE = 100;
export const ORDER_THRESHOLD_NEW_VALUE = 1000;

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

export const calculateOrder = (
  cardsList: Card[],
  destinationIndex: number,
  actCardOrder: number
): number => {
  const cards = cardsList.map((card) => card.order);

  const cardOrderIndex = cards.indexOf(actCardOrder);

  const noPrevValue = cardOrderIndex <= 0;
  const noNextValue = cardOrderIndex + 1 >= cards.length;

  let val = 0;
  if (noNextValue) {
    val = cards[cards.length - 1] + ORDER_THRESHOLD_UPDATE;
  } else if (noPrevValue) {
    val = cards[0] - ORDER_THRESHOLD_UPDATE;
  } else {
    val = (cards[destinationIndex - 1] + cards[destinationIndex]) / 2;
  }
  console.log(noNextValue, noPrevValue);
  return val;
};

export const calculateCardOrderInColum = (
  cardsList: Card[] | undefined,
  destinationIndex: number
) => {
  const cards = cardsList ? cardsList.map((card) => card.order) : [];

  const noPrevValue = destinationIndex <= 0;
  const noNextValue = destinationIndex >= cards.length;
  let val = 0;
  if (noNextValue) {
    val = cards[cards.length - 1] + ORDER_THRESHOLD_UPDATE;
  } else if (noPrevValue) {
    val = cards[0] - ORDER_THRESHOLD_UPDATE;
  } else {
    val = (cards[destinationIndex - 1] + cards[destinationIndex]) / 2;
  }
  return val;
};
