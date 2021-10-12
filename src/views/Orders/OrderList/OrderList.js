import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { makeStyles, withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';

import { getAuthToken } from 'auth/authAxios';


const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#232f3e',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function OrderList() {
    const history = useHistory();
    const classes = useStyles();
    const [rid, setRid] = useState("");
    const [orderList, setOrderList] = useState(null);

    useEffect(() => {
        if (sessionStorage.getItem("orders")) {
            setOrderList(JSON.parse(sessionStorage.getItem("orders")));
        }
    }, []);

    const handleRowClick = (event, id) => {
        // console.log("row link: " + id);
        history.push("/admin/orders/" + id);
    };

    const searchRequest = (e) => {
        if (e.keyCode === 13) {
            axios.get(`http://localhost:8080/restaurant/orders/restaurants/${rid}/orders`, { headers: { 'Authorization': getAuthToken() } })
                .then(res => {
                    // console.log(res.data)
                    setOrderList(res.data)
                    sessionStorage.setItem("orders", JSON.stringify(res.data));
                }).catch(e => {
                    console.log(e)
                })
        }
    };

    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon color="inherit" sx={{ display: 'block' }} />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Search Orders by Restaurant Id"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: 'default' },
                                }}
                                variant="standard"
                                value={rid}
                                onChange={e => setRid(e.target.value)}
                                onKeyDown={searchRequest}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No.</StyledTableCell>
                            <StyledTableCell align="center">ConfirmationCode</StyledTableCell>
                            <StyledTableCell align="center">Order Time</StyledTableCell>
                            <StyledTableCell align="center">Request Delivery Time</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList && orderList.map((row) => (
                            <StyledTableRow key={row.id}
                                onClick={event => handleRowClick(event, row.id)}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.confirmationCode}</StyledTableCell>
                                <StyledTableCell align="center">{new Date(row.submittedAt).toLocaleTimeString('en-US')}</StyledTableCell>
                                <StyledTableCell align="center">{new Date(row.requestedDeliveryTime).toLocaleTimeString('en-US')}</StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    style={row.status === "PENDING" ? { color: "red" } : { color: "GREEN" }}
                                >{row.status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}