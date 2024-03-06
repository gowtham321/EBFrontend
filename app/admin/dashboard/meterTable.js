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
  "&:hover": { cursor: "pointer", backgroundColor: "#e3f2fd" },
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
    "&:hover": { cursor: "pointer", backgroundColor: "#e3f2fd" },
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function MeterTable({ userId, setTable, setselectedUser, setselectedMeter }) {
  const [meters, setMeters] = useState(null);
  //     { id:1,address:'ab304' },
  //     { id:2,address:'ac304' },
  //     {  id:3,address:'ad304'},
  //     {  id:4,address:'ab304' },
  //     { id:5,address:'ac304' },
  //     { id:6,address:'ad304'},
  //     { id:7,address:'ab304' },
  //     {id:8,address:'ac304' },
  //     { id:9,address:'ad304'},
  //     {id:10, address:'ab304' },
  //     { id:11,address:'ac304' },
  //     { id:12,address:'ad304'},
  //   ]);
  useEffect(() => {
    fetcher({ endPoint: `Admin/Get-Meters/?uid=${userId}`, method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMeters(data);
        console.log("userdata = " + meters);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredMeters(meters);
  }, [meters]);

  if (meters == []) return <div>jadsflkajd</div>;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeters, setFilteredMeters] = useState(meters);
  const handleUserClick = (meterId) => {
    setselectedMeter(meterId);
    setTable(2);
  };
  const handleBack = () => {
    setselectedUser(null);
    setTable(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filteredMeters = meters.filter(
      (meter) =>
        // ( meter.address.toLowerCase().includes(searchTermLowerCase))
        meter.address.toLowerCase().includes(searchTermLowerCase) ||
        meter.id.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredMeters(filteredMeters);
    setPage(0);
  };

  if (filteredMeters == null) return <Loading />;
  return (
    <div>
      <Box padding={1}>
        <div>
          <h1>Meter List </h1>
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
            <StyledTable aria-label="meter table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Meter id</StyledTableCell>
                  <StyledTableCell>Meter address</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredMeters
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((meter) => (
                    <StyledTableRow
                      key={meter.id}
                      onClick={() => handleUserClick(meter.id)}
                    >
                      <StyledTableCell>{meter.id}</StyledTableCell>
                      <StyledTableCell>{meter.address}</StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]} // Define the options for rows per page
            component="div"
            count={filteredMeters.length}
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

export default MeterTable;
