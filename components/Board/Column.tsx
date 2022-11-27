import {
  CSSProperties,
  LegacyRef,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
} from "react";
import { DroppableProvidedProps } from "react-beautiful-dnd";
import {
  useEditColumnMutation,
  useRemoveColumnMutation,
} from "../../graphql/generated/gql-types";

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
  const [removeColumn, removeColumnResult] = useRemoveColumnMutation();
  const [editColumn, editColumnResult] = useEditColumnMutation();

  const removeColumnHandle = () => {
    removeColumn({ variables: { id } });
  };

  const nameDivRef = useRef<HTMLDivElement>(null);
  const onBlurHandle = (e: SyntheticEvent<HTMLDivElement>) => {
    const actName = e.currentTarget.innerHTML;
    if (actName !== name) {
      editColumn({ variables: { id: id, name: actName } });
    }
  };

  useEffect(() => {
    if (nameDivRef.current) {
      nameDivRef.current.innerHTML = name;
    }
  }, [nameDivRef, name]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          background: "slategray",
          border: "1px solid white",
        }}
      >
        <div
          id="name"
          contentEditable={true}
          onBlur={onBlurHandle}
          ref={nameDivRef}
          style={{ fontSize: "20px", fontWeight: 700 }}
        ></div>
        <button onClick={removeColumnHandle}>x</button>
      </div>
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
