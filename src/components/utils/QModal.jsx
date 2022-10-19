import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Button, Divider} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    borderRadius:"16px",
    boxShadow: 24,
    p: 4,
};

export default function QModal({ open, setOpen ,title, children, onConfirm, confirmText }) {
    const handleClose = () => setOpen(false);

    const handleAccept = () => {
        onConfirm();
        setOpen(false);
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        {title}
                    </Typography>
                    <Divider/>
                    {children}
                    <div >
                        <Button onClick={handleAccept}>{"Aceptar" || confirmText}</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
