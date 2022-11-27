import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

import { getItemStyle, ListItems } from "./utils";

interface CardProps {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  columnId: string;
  rowId: number;
  item: ListItems;
  cardRemoveHandle: (columnId: string, rowId: number) => void;
  name: string;
}
export const Card = ({
  provided,
  snapshot,
  columnId,
  rowId,
  item,
  cardRemoveHandle,
}: CardProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {item.content}
        <button
          type="button"
          onClick={() => {
            cardRemoveHandle(columnId, rowId);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
};
