import { createContext, useReducer } from "react";

export const TodoContext = createContext();

export const todoReducer = (state, action) => {
    console.log('Dispatching action:', action);
    switch(action.type) {
        case 'GET_TODOS':
            return {
                todos: action.payload,
            }
        case 'CREATE_TODO':
            return {
                todos: [action.payload, ...state.todos],
            } 
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter(todo => todo._id !== action.payload),
            };
        case 'UPDATE_TODO':
            return {
                todos: state.todos.map(todo => todo._id === action.payload._id ? action.payload : todo),
            };
        default:
            return state;
    }
}


export const TodoContextProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(todoReducer, {
        todos: null,
    });

    
    return (
        <TodoContext.Provider value={{...state,dispatch}}>
            { children }
        </TodoContext.Provider>
    )
}