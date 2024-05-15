import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Login from "./ui/Login";
import Todolist from "./ui/Todolist";
import Task from "./ui/Task";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Login />
                <Todolist />
                <Task />
            </div>
        </BrowserRouter>
    );
}

export default App;
