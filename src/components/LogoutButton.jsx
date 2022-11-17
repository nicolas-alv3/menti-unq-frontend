import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button onClick={logout} sx={{ color: "white" }}>
      Logout
    </Button>
  );
}
