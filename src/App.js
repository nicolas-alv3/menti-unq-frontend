import './App.css';
import {Container, Switch} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import Home from "./components/Home";
import {Welcome} from "./components/Welcome";
import {Header} from "./components/Header";
import * as React from "react";
import {useEffect} from "react";
import configData from "./config.json";
import {Navigate, Route, Routes} from "react-router";

export const AuthContext = React.createContext({
    accessToken: null, setAccessToken: () => {
    }
})

function App() {
    const [accessToken, setAccessToken] = React.useState(null);

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
            </Routes>
        </AuthContext.Provider>
    );
}

export default App;
