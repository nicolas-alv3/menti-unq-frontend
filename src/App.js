import './App.css';
import {AppBar, Box, Button, Container, css, Toolbar, Typography} from "@mui/material";

function Header() {
    return <AppBar component='nav' position={"static"}>
        <Toolbar>
            <Typography variant={'h4'}>MENTI - UNQ</Typography>
            <Button sx={{color:'white'}}>
                Ingresar
            </Button>
        </Toolbar>
    </AppBar>;
}

function App() {
    return (
        <>
            <Header/>
            <Container>
                <Typography variant='h1'>
                    Menti - UNQ
                </Typography>
            </Container>
        </>
    );
}

export default App;
