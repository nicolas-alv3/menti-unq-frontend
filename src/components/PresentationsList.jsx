import {
    Box, Button, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import PresentationService from "../service/PresentationService";
import {useNavigate} from "react-router";


export function PresentationsList(props) {
    const navigate = useNavigate();

    const handleDelete = (id) => () => {
        Swal.fire({
            title: '¿Estas segur@?',
            text: "Si eliminas esta presentación, no podrás revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                PresentationService.delete(id)
                    .then(() => {
                        props.updateList();
                        Swal.fire(
                            '¡Listo!',
                            'La presentación ha sido eliminada',
                            'success'
                        )
                    })
            }
        })
    }

    const boxSx = {display: 'flex', justifyContent: 'space-between', padding: '1em 5em'};


    return <>
        <Paper sx={{marginTop: '1em'}}>
            <Box sx={boxSx}>
                <Typography variant='h3'>Presentaciones ({props.presentations.length})</Typography>
                <Link to='/crearPresentacion' style={{textDecoration: 'none'}}>
                    <Button variant='contained'>Agregar presentacion</Button>
                </Link>
            </Box>
            <TableContainer sx={{marginTop: '1em', width: '90%', margin: 'auto'}}>
                <Table sx={{minWidth: 450}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nombre</TableCell>
                            <TableCell align="left">Slides</TableCell>
                            <TableCell align="left">Slide actual</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.presentations.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.slides.length}</TableCell>
                                <TableCell align="left">{`${row.currentSlide}/${row.slides.length}`}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete">
                                        <EditIcon onClick={() => navigate(`/editar/${row.id}`)}/>
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon onClick={handleDelete(row.id)}/>
                                    </IconButton>
                                    <IconButton aria-label="play">
                                        <PlayArrowOutlinedIcon onClick={() => navigate("/presentar/" + row.id)}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </>;
}