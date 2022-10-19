import QModal from "./utils/QModal";
import {Box, Typography} from "@mui/material";
import QRCode from "react-qr-code";

export default function InviteToPresentationModal({ open, setOpen, id }) {
    return <QModal open={open} setOpen={setOpen} title={"Instrucciones"} >
        <Box sx={{ width: "100%", display:"flex", justifyContent: "space-around", alignItems: "center", padding: "1em"}}>
            <Box sx={{width: "50%", display: "flex", flexDirection: "column"}}>
                <Typography variant={"h5"}>Entra  a</Typography>
                <Typography variant={"h3"}>mentiunq.edu.ar</Typography>
                <Typography variant={"h5"}>ingresa el código</Typography>
                <Typography variant={"h3"}>{id}</Typography>
            </Box>
            <Box sx={{width: "50%", display: "flex", flexDirection: "column"}}>
                <Typography variant={"h5"}>O escanea el codigo QR</Typography>
                <QRCode value={`localhost:3000/presentacion/${id}`} />
            </Box>
        </Box>
    </QModal>
}