const {createContext, useReducer} = require("react");

export const TodoContext = createContext();

export const todoReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_TODO':
            return {
                ...state,
                toDos: action.payload
            }
        case 'ADD_TODO':
            return {
                toDos: [action.payload, ...state.toDos]
            };

        case 'UPDATE_TODO':
            return{
                toDos: state.toDos.map(
                    toDo => toDo.title === action.payload.title ? action.payload : toDo
                )
            }
        case 'DELETE_TODO':
            return {
                toDos: state.toDos.filter(
                    toDo => toDo.title !== action.payload.title
                )
            };
        default:
            return state;
    }
}

export const TodoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, {
        toDos: []
    })

    return(
        <TodoContext.Provider value={{...state, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}
