import { CSSProperties, LegacyRef, ReactNode } from "react";
import { DroppableProvidedProps } from "react-beautiful-dnd";

interface ColumnProps {
  divRef: LegacyRef<HTMLDivElement>;
  style: CSSProperties;
  droppableProps: DroppableProvidedProps;
  children: ReactNode;
  id: string;
  handleAddItem: (columnId: string) => void;
  name: string;
}

export const Column = ({
  divRef,
  style,
  droppableProps,
  children,
  id,
  name,
  handleAddItem,
}: ColumnProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <div ref={divRef} style={style} {...droppableProps}>
        {children}
      </div>
      <div>
        <button
          onClick={() => {
            handleAddItem(id);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
