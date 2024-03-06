"use client";

import React, { useState, useEffect } from "react";
import { Divider, Radio, Table, message } from "antd";
import { fetcher } from "@/app/services/baseServices";
import Loading from "@/app/components/loading";
import { Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userData, setuserData] = useState(null);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setselectedUsers(selectedRowKeys);
    },
  };

  useEffect(() => {
    fetcher({ endPoint: "Admin/get-all-users", method: "GET" })
      .then((res) => res.json())
      .then((data) =>
        setuserData(
          data.map((item, index) => {
            return { ...item, key: item.id };
          })
        )
      );
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(selectedUsers));
  }, [selectedUsers]);

  if (userData == null) return <Loading />;

  return (
    <div className="flex flex-col w-full h-full justify-between">
      {contextHolder}
      <Table
        className="w-full h-full"
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={userData}
      />
      <Box
        padding={2}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <LoadingButton
          loading={isLoading}
          variant="contained"
          style={{ marginLeft: "250px" }}
          onClick={() => {
            setisLoading(true);
            if (selectedUsers.length < 1) {
              messageApi.open({
                type: "warning",
                content: "Please select at least one user",
              });
              setisLoading(false);
            } else {
              fetcher({
                endPoint: `Admin/generate-bills`,
                method: "POST",
                body: selectedUsers,
              })
                .then((res) => {
                  if (res.ok) {
                    messageApi.open({
                      type: "success",
                      content: "Bill has been generated",
                    });
                  } else {
                    messageApi.open({
                      type: "error",
                      content: "Operation failed",
                    });
                  }
                  setisLoading(false);
                })
                .catch((err) => {
                  setisLoading(false);
                  messageApi.open({
                    type: "error",
                    content: `Operation failed due to ${err}`,
                  });
                });
            }
          }}
        >
          Generate-Bill
        </LoadingButton>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          style={{ marginRight: "300px" }}
          onClick={() => {
            setisLoading(true);
            fetcher({ endPoint: `Admin/penalty`, method: "POST" })
              .then((res) => {
                if (res.ok) {
                  messageApi.open({
                    type: "success",
                    content: "All dues has been updated",
                  });
                } else {
                  messageApi.open({
                    type: "warning",
                    content: "Unable to perform operation",
                  });
                }
                setisLoading(false);
              })
              .catch((err) => {
                setisLoading(false);
                messageApi.open({
                  type: "error",
                  content: `Operation failed due to ${err}`,
                });
              });
          }}
        >
          Penalty
        </LoadingButton>
      </Box>
    </div>
  );
};
export default App;
