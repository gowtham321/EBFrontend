"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import Loading from "@/app/components/loading";
import { fetcher } from "@/app/services/baseServices";
// import Button from '@mui/material/Button';

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

function Generatebill() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedRows, setCheckedRows] = useState([]);
  const [checked, setChecked] = useState(false);
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetcher({ endPoint: "Admin/get-all-users", method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        console.log("userdata = " + users);
      })
      .catch((err) => console.log(err));
  }, []);
  const [filteredUsers, setFilteredUsers] = useState(users);
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  if (filteredUsers == null) return <Loading />;

  if (users == []) return <div>jadsflkajd</div>;

  //   {
  //     id: 9,
  //     name: "User 3",
  //     email: "gowthamsaravanan1@gmail.com",
  //     address: "ad304",
  //   },
  //   {
  //     id: 10,
  //     name: "User 1",
  //     email: "gowthamsaravanan1@gmail.com",
  //     address: "ab304",
  //   },
  //   {
  //     id: 11,
  //     name: "User 2",
  //     email: "gowthamsaravanan1@gmail.com",
  //     address: "ac304",
  //   },
  //   {
  //     id: 12,
  //     name: "User 3",
  //     email: "gowthamsaravanan1@gmail.com",
  //     address: "ad304",
  //   },
  // ]);

  let rows = [];

  const handleChange = (event, id) => {
    const isChecked = event.target.checked;
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[id] = isChecked;
    setCheckedRows(updatedCheckedRows);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredUsers(filteredUsers);
    setPage(0);
  };
  const handleChange1 = () => {
    rows.map((row) => console.log(row));
  };
  const handlePenalty = () => {
    fetcher({ endPoint: `Admin/penalty`, method: "POST" })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const Billgen = () => {
    fetcher({
      endPoint: `Admin/generate-bills`,
      method: "POST",
      body: checkedRows,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full p-2 flex flex-col space-y-2 overflow-y-auto">
      <Box padding={4}>
        <h1>User List</h1>
        <Box display="flex" justifyContent="flex-end" padding={2}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => handleSearch()}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            style={{ marginBottom: 20, marginLeft: 20 }}
          />
        </Box>
        <Box padding={2}>
          <TableContainer component={Paper}>
            <StyledTable aria-label="User table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>User Name</StyledTableCell>
                  <StyledTableCell>User email</StyledTableCell>
                  <StyledTableCell>User address</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <StyledTableRow
                      key={user.id}
                      // onClick={() => handleUserClick(user.id)}
                    >
                      <Checkbox
                        checked={checkedRows[user.id] || false}
                        onChange={(event) => {
                          rows.push(user.id);
                          handleChange(event, user.id);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />

                      <StyledTableCell>{user.name}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>{user.address}</StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]} // Define the options for rows per page
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={() => handleChangePage()}
            onRowsPerPageChange={() => handleChangeRowsPerPage()}
          />
        </Box>
      </Box>
      <Box
        padding={2}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          style={{ marginLeft: "250px" }}
          onClick={() => Billgen()}
        >
          Generate-Bill
        </Button>
        <Button
          variant="contained"
          style={{ marginRight: "300px" }}
          onClick={() => handlePenalty(checkedRows)}
        >
          Penalty
        </Button>
      </Box>
    </div>
  );
}

export default Generatebill;
