import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
    modalActive : boolean;    
    boardArray : IBoard[];
}

type TAddBoardAction = {
    board : IBoard;
}

type TDeleteListAction = {
    boardId : string;
    listId : string;
}

type TAddListAction = {
    boardId : string;
    list : IList;
}
type TAddTaskAction = {
    boardId : string;
    listId : string;
    task : ITask;
}
type TDeleteTaskAction = {
    boardId : string;
    listId : string;
    taskId : string;
}
type TDeleteBoardAction = {
    boardId : string;
}

const initialState: TBoardState= {
    modalActive : false,
    boardArray : [
        {
            boardId: "list-0",
            boardName : "list 1",
            lists : [
                {
                    listId: "list-1",
                    listName : "List 2",
                    tasks : [
                        {
                            taskId : "task-0",
                            taskName : "Task 1",
                            taskDescription : "Description",
                            taskOwner : "John"
                        },{
                            taskId : "task-1",
                            taskName : "Task 2",
                            taskDescription : "Description",
                            taskOwner : "Child"
                        },{
                            taskId : "task-2",
                            taskName : "Task 3",
                            taskDescription : "Description",
                            taskOwner : "Park"
                        }
                    ]
                }
        ]
        }
    ]
}

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers : {
        addBoard : (state, {payload}:PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.board)
        },

        deleteBoard : (state, {payload}:PayloadAction<TDeleteBoardAction>) => {
            state.boardArray.filter(
                board => board.boardId !== payload.boardId
            )
        },

        addList : (state, {payload}:PayloadAction<TAddListAction>) => {
            state.boardArray.map(board => 
                board.boardId === payload.boardId
                ? {...board, lists: board.lists.push(payload.list)}
                : board
        
        )},
        addTask: (state, {payload}:PayloadAction<TAddTaskAction>) => {
            state.boardArray.map(board => 
                board.boardId ===payload.boardId
                ?{
                    ...board,
                    lists: board.lists.map(list => 
                        list.listId == payload.listId
                        ?{
                            ...list,
                            tasks: list.tasks.push(payload.task)
                        }:list
                    )
                }
                :board
            )
        },
        updateTask :  (state, {payload}:PayloadAction<TAddTaskAction>) => {
            state.boardArray = state.boardArray.map(board =>
                board.boardId === payload.boardId
                ?
                {
                ...board,
                lists: board.lists.map(list => 
                    list.listId === payload.listId
                    ?
                    {
                        ...list,
                        tasks : list.tasks.map(task => 
                            task.taskId === payload.task.taskId
                            ? payload.task
                            : task
                        )
                    }
                    :list
                )
                }
                :board
            )
        },

        deleteTask: (state,{payload}: PayloadAction<TDeleteTaskAction>)=>{
            state.boardArray = state.boardArray.map(board => 
                board.boardId === payload.boardId
                ?
                {
                    ...board,
                    lists : board.lists.map(list => 
                        list.listId === payload.listId
                        ?{
                            ...list,
                            tasks: list.tasks.filter(
                                task=> task.taskId !== payload.taskId
                            )
                        }   
                        :list
                    )
                }
                :board
            )
        },

        deleteList : (state, {payload}:PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map(
                board => 
                board.boardId === payload.boardId
                ?
                {
                    ...board,
                    lists: board.lists.filter(
                        list => list.listId !== payload.listId
                    )
                }
                :board
            )
        },
        setMdoalActive : (state,{payload} : PayloadAction<boolean>) => {
            state.modalActive = payload 
        }
    }
})

export const {addList,addTask,addBoard, updateTask,
    deleteTask,deleteList, setMdoalActive, deleteBoard} = boardSlice.actions;
export const boardReducer = boardSlice.reducer; 