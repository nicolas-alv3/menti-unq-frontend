import './App.css';
import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import Home from "./components/Home";

function LoginButton() {
    const {loginWithRedirect} = useAuth0();

    return <Button onClick={loginWithRedirect} sx={{color: "white"}}>
        Ingresar
    </Button>;
}

function LogoutButton() {
    const {logout} = useAuth0();

    return <Button onClick={logout} sx={{color: "white"}}>
        Logout
    </Button>;
}

function Header() {
    const {isAuthenticated} = useAuth0()
    return <AppBar component='nav' position={"static"}>
        <Toolbar>
            <Typography variant={'h4'}>MENTI - UNQ</Typography>
            {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
        </Toolbar>
    </AppBar>;
}

function App() {
    return (
        <>
            <Header/>
            <Container>
                <Home />
            </Container>
        </>
    );
}

export default App;
