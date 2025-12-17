import { TodoContext } from "../context/todoContext";
import React from "react";

export const useTodoContext = () =>{
    const context = React.useContext(TodoContext);

    if(!context){
        throw new Error(
            "useTodoContext must be used within a TodoContextProvider"
        )
    }
    return context;
}