import './App.css';
import {Container} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import Home from "./components/Home";
import {Welcome} from "./components/Welcome";
import {Header} from "./components/Header";
import * as React from "react";
import {useEffect} from "react";
import configData from "./config.json";

export const AuthContext = React.createContext()

function App() {
    const {error, isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently} = useAuth0();
    const [accessToken, setAccessToken] = React.useState(null);

    useEffect(() => {
        getAccessTokenSilently().then(data => {
            setAccessToken(data)
        }).catch((e)=> {
            console.log("error", e)
        })
    }, [getAccessTokenSilently]);

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!isAuthenticated) {
        return loginWithRedirect()
    }
    return (
        <AuthContext.Provider value={accessToken}>
            <Header/>
            <Container sx={{backgroundColor: "#F0EDE0"}} maxWidth={false}>
                <Home/>
            </Container>
        </AuthContext.Provider>
    );
}

export default App;
