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

function UserTable({ setselectedUser, setTable }) {
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

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  if (users == null) return <Loading />;

  if (users == []) return <div>jadsflkajd</div>;
  // const [users, setUsers] = useState([
  //     { id:1, name: 'User1',email:'gowthamsaravanan1@gmail.com',address:'ab304' },
  //     { id:2,name: 'User2',email:'gowthamsaravanan1@gmail.com',address:'ac304' },
  //     {  id:3,name: 'User3',email:'gowthamsaravanan1@gmail.com',address:'ad304'},
  //     {  id:4,name: 'User1',email:'gowthamsaravanan1@gmail.com' ,address:'ab304' },
  //     { id:5,name: 'User2',email:'nivethika@gmail.com',address:'ac304' },
  //     { id:6, name: 'User3',email:'nivethika@gmail.com',address:'ad304'},
  //     { id:7, name: 'User1',email:'gowthamsaravanan1@gmail.com' ,address:'ab304' },
  //     {id:8, name: 'User2',email:'gowthamsaravanan1@gmail.com',address:'ac304' },
  //     { id:9, name: 'User3',email:'gowthamsaravanan1@gmail.com',address:'ad304'},
  //     {id:10,  name: 'User1',email:'gowthamsaravanan1@gmail.com' ,address:'ab304' },
  //     { id:11,name: 'User2',email:'gowthamsaravanan1@gmail.com',address:'ac304' },
  //     { id:12, name: 'User3',email:'gowthamsaravanan1@gmail.com',address:'ad304'},
  //   ]);

  const handleUserClick = (userId) => {
    setselectedUser(userId);
    setTable(1);
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
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTermLowerCase) ||
        user.email.toLowerCase().includes(searchTermLowerCase) ||
        user.address.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredUsers(filteredUsers);
    setPage(0);
  };

  if (filteredUsers == null) return <Loading />;

  return (
    <div>
      <Box padding={4}>
        <div>
          <h1>User List</h1>
        </div>
        <Box display="flex" justifyContent="flex-end" padding={2}>
          <TextField
            label="Search"
            variant="outlined"
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
        <Box padding={2}>
          <TableContainer component={Paper}>
            <StyledTable aria-label="User table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>User Name</StyledTableCell>
                  <StyledTableCell>User email</StyledTableCell>
                  <StyledTableCell>User address</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredUsers &&
                  filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <StyledTableRow
                        key={user.id}
                        onClick={() => handleUserClick(user.id)}
                      >
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
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </div>
  );
}

export default UserTable;
