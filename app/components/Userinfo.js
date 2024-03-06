"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { fetcher } from "../services/baseServices";
import { data } from "autoprefixer";

const Userinfo = ({ userData }) => {
  console.log(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [id, setId] = useState(userData.id);
  const [email, setEmail] = useState(userData.email);
  const [phoneno, setPhoneno] = useState(userData.phoneNumber);
  const [address, setAddress] = useState(userData.address);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    fetcher({
      endPoint: "User/edit-user-details",
      method: "PUT",
      body: { username: name, phoneNumber: phoneno, address },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "id":
        setId(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneno(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  return (
    <center>
      <form noValidate autoComplete="off">
        {isEditing ? (
          <>
            <TextField
              name="name"
              label="Name"
              value={name}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <br></br>

            <TextField
              name="address"
              label="Address"
              value={address}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <br></br>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={phoneno}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <br></br>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <h3 style={{ marginBottom: "16px", marginTop: "16px" }}>
              Name: {name}
            </h3>
            <h3 style={{ marginBottom: "16px" }}>Id: {id}</h3>
            <h3 style={{ marginBottom: "16px" }}>Email: {email}</h3>
            <h3 style={{ marginBottom: "16px" }}>Phone Number: {phoneno}</h3>
            <h3 style={{ marginBottom: "16px" }}>Address: {address}</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </>
        )}
      </form>
    </center>
  );
};

export default Userinfo;
