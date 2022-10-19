import './App.css';
import Home from "./components/Home";
import * as React from "react";
import {Route, Routes} from "react-router";
import {CreatePresentationPage} from "./CreatePresentationPage";
import {AnswerPresentationPage} from "./components/answers/AnswerPresentationPage";
import PathErrorPage from "./components/PathErrorPage";
import PresentPresentationPage from "./components/PresentPresentationPage";

function App() {

    return (<Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/crearPresentacion' element={<CreatePresentationPage/>}/>
            <Route path='/presentacion/:id' element={<AnswerPresentationPage/>}/>
            <Route path='/presentar/:id' element={<PresentPresentationPage/>}/>
            <Route path='/pathError' element={<PathErrorPage/>}/>
        </Routes>);
}

export default App;
