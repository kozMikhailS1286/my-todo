import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./ui/Login";
import Todolists from "./ui/Todolists";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login/> }  />
                <Route path="/todolist" element={<Todolists />} />
                <Route path="*" element={"PAGE NOT FOUND"} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
