"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  styled,
  tableCellClasses,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "@/app/components/loading";
import { fetcher } from "@/app/services/baseServices";

//style for table
const StyledTable = styled(Table)({
  minWidth: 650,
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function BillTable({ meterId, setTable, setselectedMeter }) {
  const [bills, setBills] = useState(null);
  //     { id:1,amount:2000,reading:230,status:'paid',penalty:'100',time:'12/2/2024 23:45:46' },
  //     { id:2,amount:2000,reading:230,status:'paid',penalty:'100',time:'12/2/2024 23:45:46' },
  //     { id:3,amount:2000,reading:230,status:'paid',penalty:'100',time:'12/2/2024 23:45:46' },
  //     { id:4,amount:5000,reading:230,status:'paid',penalty:'100',time:'12/2/2024 23:45:46' },
  //     { id:1,amount:2000,reading:230,status:'paid',penalty:'100',time:'12/2/2024 23:45:46' },
  //     { id:1,amount:2000,reading:230,status:'paid',penalty:'100',time:'12/2/2024 23:45:46' },
  //     { id:1,amount:2000,reading:230,status:'paid',penalty:'100',time:'12/2/2024 23:45:46' },
  //     { id:1,amount:2000,reading:230,status:'unpaid',penalty:'100',time:'12/2/2024 23:45:46' },
  //     { id:1,amount:2000,reading:230,status:'unpaid',penalty:'100',time:'12/2/2024 23:45:46' },
  //   ]);
  useEffect(() => {
    fetcher({
      endPoint: `Admin/get-details-for-meter?mid=${meterId}`,
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBills(data);
        console.log("userdata = " + bills);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredBills(bills);
  }, [bills]);

  if (bills == []) return <div>jadsflkajd</div>;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBills, setFilteredBills] = useState(bills);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleBack = () => {
    setselectedMeter(null);
    setTable(1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filteredBills = bills.filter((bill) =>
      bill.status.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredBills(filteredBills);
    setPage(0);
  };

  if (filteredBills == null) return <Loading />;

  const getFormattedDate = (date) => {
    const d = new Date(date);
    const day = d.getDay().toString();
    const month = d.getMonth().toString();
    const year = d.getFullYear().toString();
    const hour = d.getHours().toString();
    const minutes = d.getMinutes().toString();
    return `${day}-${month}-${year}  ${hour}:${minutes}`;
  };

  const getBillStatus = (status) => {
    switch (status) {
      case 0:
        return "Paid";
      case 1:
        return "Due";
      case 2:
        return "Unpaid";

      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <Box padding={1}>
        <div>
          <h1>Bill List of Meter {meterId} </h1>
        </div>
        <Box display="flex" justifyContent="space-between" padding={2}>
          <Box Box display="flex" justifyContent="flex-start" paddingTop={1}>
            <Button
              variant="contained"
              size="small"
              sx={{ height: "30px" }}
              onClick={() => handleBack()}
            >
              Back
            </Button>
          </Box>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            style={{ marginBottom: 20, marginLeft: 20 }}
          />
        </Box>
        <Box padding={1}>
          <TableContainer component={Paper}>
            <StyledTable aria-label="bill table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Bill id</StyledTableCell>
                  <StyledTableCell>Bill amount</StyledTableCell>
                  <StyledTableCell>Reading</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Penalty</StyledTableCell>
                  <StyledTableCell>Generated time</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredBills
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bill, i) => (
                    <StyledTableRow key={bill.billId}>
                      <StyledTableCell>{i + 1}</StyledTableCell>
                      <StyledTableCell>{bill.billAmount}</StyledTableCell>
                      <StyledTableCell>{bill.readingValue}</StyledTableCell>
                      <StyledTableCell>
                        {getBillStatus(bill.status)}
                      </StyledTableCell>
                      <StyledTableCell>{bill.penaltyamount}</StyledTableCell>
                      <StyledTableCell>
                        {getFormattedDate(bill.billGenereatedTime)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]} // Define the options for rows per page
            component="div"
            count={filteredBills.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </div>
  );
}

export default BillTable;
