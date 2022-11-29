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
  draggingOver: boolean;
  droppableProps: DroppableProvidedProps;
  children: ReactNode;
  id: string;
  handleAddItem: (columnId: string) => void;
  name: string;
}

export const Column = ({
  divRef,
  draggingOver,
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
      <div className="bg-gray-200 text-slate-800 p-2 m-2 rounded-md h-auto w-[250px] shadow-inner ">
        <div className="flex  px-3 py-2 justify-between ">
          <div
            id="name"
            contentEditable={true}
            onBlur={onBlurHandle}
            ref={nameDivRef}
            className="text-xl font-bold"
          ></div>
          <button className="text-slate-400" onClick={removeColumnHandle}>
            x
          </button>
        </div>
        <div
          ref={divRef}
          className={`${
            draggingOver ? "bg-gray-200 " : "bg-slate-400"
          }w-full px-1 `}
          {...droppableProps}
        >
          {children}
        </div>
        <div>
          <button
            className="pl-2 text-slate-400 w-full text-left"
            onClick={() => {
              handleAddItem(id);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
