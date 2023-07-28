'use client'
import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {
    //Get state from store
    const [board, getBoard, setBoardState, updateTaskInDB] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateTaskInDB
    ]);

    useEffect(() => {
        getBoard();
    }, [getBoard])

    const handleOnDragEnd = (result: DropResult) => {
        const {destination, source, type} = result;
        if (!destination) return;
        // Handle column drag
        if (type === "column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangedColumns = new Map(entries);
            setBoardState({
                ...board,
                columns: rearrangedColumns
            })
        }

        //Handle card drag
        if (type === "card") {
            if (source.droppableId === destination.droppableId && source.index === destination.index) return;
            const entries = Array.from(board.columns.entries());
            const sourceColumn = entries[parseInt(source.droppableId)];
            const destColumn = entries[parseInt(destination.droppableId)];
            const [sourceCard] = sourceColumn[1].todos.splice(source.index, 1);
            destColumn[1].todos.splice(destination.index, 0, sourceCard)
            const rearrangedColumns = new Map(entries); 
            setBoardState({
                ...board,
                columns: rearrangedColumns
            })
            
            updateTaskInDB(sourceCard, destColumn[1].id)
        }
        
    }

    return (
    <div className='mt-10 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                    >
                        {Array.from(board.columns.entries()).map(([id, column], index) => {
                            return <Column key={id as TypedColumn} id={id as TypedColumn} todos={column.todos} index={index}/>
                        })}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>
  )
}

export default Board