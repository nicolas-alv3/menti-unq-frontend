import {
    Box, Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";

export function PresentationsList(props) {
    const boxSx = {display: 'flex', justifyContent: 'space-between', padding: '1em 5em'};
    return <>
        {
            props.presentations.length > 0 && <Paper sx={{marginTop: '1em'}}>
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
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Slides</TableCell>
                                <TableCell align="right">Respuestas</TableCell>
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
                                    <TableCell align="right">{row.slides.length}</TableCell>
                                    <TableCell align="right">ZERO</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        }
    </>;
}