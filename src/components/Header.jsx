import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

export function Header() {
  const { isAuthenticated } = useAuth0();
  return (
    <AppBar component="nav" position="static">
      <Toolbar
        sx={{
          backgroundColor: "#970C10",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <Typography variant="h4">UNQui-Meter</Typography>
        </Link>
        <Box>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Box>
      </Toolbar>
    </AppBar>
  );
}
