import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMetadata } from "../../store/actions/metadata";
import { BeatLoader } from "react-spinners";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const columns = [
  { id: 'nasdaqTraded', label: 'Nasdaq Traded'},
  { id: 'symbol', label: 'Symbol'},
  { id: 'securityName', label: 'Security Name'},
  { id: 'listingExchange', label: 'Listing Exchange'},
  { id: 'marketCategory', label: 'Market Category'},
  { id: 'etf', label: 'ETF'},
  { id: 'roundLotSize', label: 'Round Lot Size'},
  { id: 'testIssue', label: 'Test Issue'},
  { id: 'financialStatus', label: 'Financial Status'},
  { id: 'cqsSymbol', label: 'CQS Symbol'},
  { id: 'nasdaqSymbol', label: 'NASDAQ Symbol'},
  { id: 'nextShares', label: 'Next Shares'}
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: "85vh",
  }
});

const Metadata = props => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        props.getMetadata();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    if (!props.isLoading && !props.isAuthenticated) {
        return <Redirect to="/" />;
    }
    if(props.loading){
        return (
            <div className="loader">
                <BeatLoader
                    size={150}
                    color={"#3399ff"}
                    loading={props.loading}
                    />
            </div>
        )
    }else{
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props && props.data.length > 0 && props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    if(column.id === "symbol"){
                                        let route = `/equity/${row._id}`
                                        return (
                                            <TableCell key={column.id}>
                                                <a href={route}>{value}</a>
                                            </TableCell>
                                        );
                                    }else{
                                        return(
                                            <TableCell key={column.id}>
                                                {value}
                                            </TableCell>
                                        )
                                    }
                                })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    data: state.metadata.data,
    loading: state.metadata.loading,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});
  
export default connect(mapStateToProps, { getMetadata })(Metadata);