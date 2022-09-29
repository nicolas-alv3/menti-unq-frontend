import './App.css';
import Home from "./components/Home";
import * as React from "react";
import {Route, Routes} from "react-router";
import {CreatePresentationPage, TabPanel} from "./CreatePresentationPage";

export const AuthContext = React.createContext({
    accessToken: null, setAccessToken: () => {
    }
})

function App() {
    const [accessToken, setAccessToken] = React.useState(null);

    return (<AuthContext.Provider value={{accessToken, setAccessToken}}>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/crearPresentacion' element={<CreatePresentationPage/>}/>
        </Routes>
    </AuthContext.Provider>);
}

export default App;
