import { create } from 'zustand'
import { getTodosGroupedByColumn, updateTaskInDB, deleteTaskInDB, addNewTaskToDB } from '@/lib/dbOperations';
import { databases } from '@/appwrite';

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTaskInDB: (todo: Task, columnId: TypedColumn) => void;
    deleteTaskInDB: (todo: Task) => void;
    addNewTaskToDB: (title:string, columnId:TypedColumn, image?:File|null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;

    newTaskInput: string;
    setNewTaskInput: (input: string) => void;

    newTaskType: TypedColumn;
    setNewTaskType: (columnId:TypedColumn) => void;

    image: File | null;
    setImage: (image: File|null) => void
}

//Create Board Store
export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async() => {
    const board = await getTodosGroupedByColumn();
    console.log(board)
    set({board});
  },
  setBoardState: (board) => set({board : board}),
  updateTaskInDB: updateTaskInDB,
  deleteTaskInDB: (task:Task) => {
    deleteTaskInDB(task);
  },
  addNewTaskToDB: addNewTaskToDB,
  searchQuery : "",
  setSearchQuery : (query) => set({searchQuery : query}),

  newTaskInput: "",
  setNewTaskInput: (input) => set({newTaskInput:input}),

  newTaskType: "todo",
  setNewTaskType: (columnId) => set({newTaskType:columnId}),

  image: null,
  setImage: (image) => set({image:image})
}))