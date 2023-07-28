'use client'
import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'
import {getImageViewFromDB} from '@/lib/dbOperations'
import Image from 'next/image';

type Props = {
    task:Task;
    index:number;
    id:TypedColumn;
    innerRef:(element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps : DraggableProvidedDragHandleProps | null | undefined
}

function TaskCard({ task, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
    const [board, getBoard, setBoardState, deleteTaskInDB] = useBoardStore((state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.deleteTaskInDB
    ]);
  
    const handleDelete = () => {
      console.log(index);
      console.log(board.columns.get(id)!.todos[index]);
      deleteTaskInDB(board.columns.get(id)!.todos[index]);
      //Temporary fix
      window.location.reload();
    };
  
    const [taskImage, setTaskImage] = useState<string>("");
  
    useEffect(() => {
      // Fetch the image URL once the component is mounted
      if (task.image) {
        getImageViewFromDB(task.image)
          .then((imageUrl) => {
            console.log(imageUrl)
            setTaskImage(imageUrl);
          })
          .catch((error) => {
            console.error('Error fetching image URL:', error);
          });
      }
    }, [task.image]);
  
    return (
      <div
        {...draggableProps} {...dragHandleProps} ref={innerRef}
        className='bg-white rounded-md space-y-2 drop-shadow-md'
      >
        {/* Main tag content */}
        <div className='flex justify-between items-center p-4'>
          <p>{task.title}</p>
          <button onClick={handleDelete} className='text-red-500 hover:text-red-600'>
            <XCircleIcon className='ml-5 h-8 w-8' />
          </button>
        </div>
  
        {/* Image */}
        
        {/* Render the image only if the taskImage state is not empty */}
        {taskImage && 
        <div className='relative h-full w-full rounded-b-md'>
        <Image src={taskImage} alt='Task Image' width={400} height={200} className=' rounded-b-md w-full object-contain' />
          </div>}
      
      </div>
    )
  }
  

export default TaskCard