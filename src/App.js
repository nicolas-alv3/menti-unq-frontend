import "./App.css";
import * as React from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import { CreatePresentationPage } from "./CreatePresentationPage";
import { AnswerPresentationPage } from "./components/answers/AnswerPresentationPage";
import PathErrorPage from "./components/PathErrorPage";
import PresentPresentationPage from "./components/PresentPresentationPage";
import FindByCodePage from "./components/FindByCodePage";
import { EditPresentationPage } from "./EditPresentationPage";

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/crearPresentacion" element={<CreatePresentationPage />} />
      <Route path="/editar/:id" element={<EditPresentationPage />} />
      <Route path="/codigo" element={<FindByCodePage />} />
      <Route path="/presentacion/:id" element={<AnswerPresentationPage />} />
      <Route path="/presentar/:id" element={<PresentPresentationPage />} />
      <Route path="/pathError" element={<PathErrorPage />} />
    </Routes>
  );
}

export default App;
