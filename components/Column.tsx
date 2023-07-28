import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn;
  todos: Task[];
  index: number;
};

const idToColumnTitle = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  const [searchQuery, setSearchQuery, setNewTaskType] = useBoardStore((state) => [
    state.searchQuery,
    state.setSearchQuery,
    state.setNewTaskType
  ]);

  const [openModal] = useModalStore((state) => [
    state.openModal
  ])

  const handleAddTask = () => {
    openModal();
    setNewTaskType(id);
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-light-column-bg/80"
                }`}
              >
                {/* Title */}
                <h2 className="flex justify-between font-bold text-xl p-2 mb-2">
                  {idToColumnTitle[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full font-normal px-2 py-1 text-sm">
                    {!searchQuery ? todos.length : todos.filter(todo => todo.title
                        .toLowerCase()
                        .includes(searchQuery.trim().toLowerCase())).length}
                  </span>
                </h2>

                {/* Cards */}
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    // TODO: debounce for search

                    //Don't render if not match search query
                    if (
                      searchQuery &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchQuery.trim().toLowerCase())
                    )
                      return null;

                    return (
                      <div>
                        <Draggable
                          key={todo.$id}
                          draggableId={todo.$id}
                          index={index}
                        >
                          {(provided) => (
                            <TaskCard
                              task={todo}
                              index={index}
                              id={id}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      </div>
                    );
                  })}

                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button onClick={handleAddTask} className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h=10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
