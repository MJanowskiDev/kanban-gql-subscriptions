import { SyntheticEvent, useEffect, useRef } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useEditCardContentMutation } from "../../graphql/generated/gql-types";

import { getItemStyle } from "./utils";

interface CardProps {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  item: any;
  cardRemoveHandle: (cardId: string) => void;
  name: string;
}
export const Card = ({
  provided,
  snapshot,
  item,
  cardRemoveHandle,
}: CardProps) => {
  const [editContent, editContentResult] = useEditCardContentMutation();

  const contentDivRef = useRef<HTMLDivElement>(null);
  const onBlurHandle = (e: SyntheticEvent<HTMLDivElement>) => {
    const actContent = e.currentTarget.innerHTML;
    if (item.content !== actContent) {
      editContent({ variables: { id: item.id, content: actContent } });
    }
  };

  useEffect(() => {
    if (contentDivRef.current) {
      contentDivRef.current.innerHTML = item.content;
    }
  }, [contentDivRef, item.content]);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <div
        ref={contentDivRef}
        contentEditable={true}
        onBlur={onBlurHandle}
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 4px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <small>{item.order}</small>
        <button
          type="button"
          onClick={() => {
            cardRemoveHandle(item.id);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
};
