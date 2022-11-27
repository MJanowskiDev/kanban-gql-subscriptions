import { CSSProperties, LegacyRef, ReactNode } from "react";
import { DroppableProvidedProps } from "react-beautiful-dnd";

interface ColumnProps {
  divRef: LegacyRef<HTMLDivElement>;
  style: CSSProperties;
  droppableProps: DroppableProvidedProps;
  children: ReactNode;
}

export const Column = ({
  divRef,
  style,
  droppableProps,
  children,
}: ColumnProps) => {
  return (
    <div ref={divRef} style={style} {...droppableProps}>
      {children}
    </div>
  );
};
