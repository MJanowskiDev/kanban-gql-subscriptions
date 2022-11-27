import { CSSProperties, LegacyRef, ReactNode } from "react";
import { DroppableProvidedProps } from "react-beautiful-dnd";

interface ColumnProps {
  divRef: LegacyRef<HTMLDivElement>;
  style: CSSProperties;
  droppableProps: DroppableProvidedProps;
  children: ReactNode;
  id: number;
  handleAddItem: (columnId: number) => void;
}

export const Column = ({
  divRef,
  style,
  droppableProps,
  children,
  id,
  handleAddItem,
}: ColumnProps) => {
  return (
    <div ref={divRef} style={style} {...droppableProps}>
      {children}
      <button
        onClick={() => {
          handleAddItem(id);
        }}
      >
        Add
      </button>
    </div>
  );
};
