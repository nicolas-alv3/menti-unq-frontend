import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";

export function LoginButton() {
    const {loginWithRedirect} = useAuth0();

    return <Button onClick={loginWithRedirect} sx={{color: "white"}}>
        Ingresar
    </Button>;
}