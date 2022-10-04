import './App.css';
import Home from "./components/Home";
import * as React from "react";
import {Route, Routes} from "react-router";
import {CreatePresentationPage} from "./CreatePresentationPage";

function App() {

    return (<Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/crearPresentacion' element={<CreatePresentationPage/>}/>
        </Routes>);
}

export default App;
