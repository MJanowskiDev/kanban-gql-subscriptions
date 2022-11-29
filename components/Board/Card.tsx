import { SyntheticEvent, useEffect, useRef } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useEditCardContentMutation } from "../../graphql/generated/gql-types";

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
      className={`${
        snapshot.isDragging ? "bg-lime-300" : "bg-slate-50"
      }  text-black  my-2 px-2 py-3  rounded-md flex justify-between text-lg shadow-md `}
    >
      <div
        ref={contentDivRef}
        contentEditable={true}
        onBlur={onBlurHandle}
        className="w-full mr-2 p-1"
      ></div>

      <button
        type="button"
        className="text-slate-500"
        onClick={() => {
          cardRemoveHandle(item.id);
        }}
      >
        x
      </button>
    </div>
  );
};
