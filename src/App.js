import './App.css';
import {Container} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import Home from "./components/Home";
import {Welcome} from "./components/Welcome";
import {Header} from "./components/Header";

function App() {
    const {isAuthenticated} = useAuth0();
    return (
        <>
            <Header/>
            <Container sx={{backgroundColor: "#F0EDE0"}} maxWidth={false}>
                {isAuthenticated ? <Home/> : <Welcome/>}
            </Container>
        </>
    );
}

export default App;
