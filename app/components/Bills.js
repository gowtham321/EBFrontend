import React from "react";
import { Card, Tag, message } from "antd";
import { Button } from "@mui/material";
import { fetcher } from "../services/baseServices";
import jsPDF from "jspdf";

function Bill({ bill, isCurrent = true, messageApi, loadData }) {
  const handleDownload = () => {
    const { id, amount, status, penaltyamount, genereatedTime } = bill;
    const doc = new jsPDF();
    doc.text(`ID: ${id}`, 10, 10);
    doc.text(`Amount: ${amount}`, 10, 20);
    doc.text(`Status: ${status}`, 10, 30);
    doc.text(`Penalty Amount: ${penaltyamount}`, 10, 40);
    doc.text(
      `Generated Time: ${new Date(genereatedTime).toLocaleString()}`,
      10,
      50
    );
    doc.save("document.pdf");
  };

  return (
    <Card
      title="Bill Id"
      bordered={true}
      style={{
        width: "100%",
      }}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row justify-between">
          <h4>{bill.id}</h4>
          <h4>{bill.genereatedTime.split("T")[0]}</h4>
          <h3>$ {bill.amount + bill.penaltyamount}</h3>
        </div>
        <div className="flex flex-row py-3 justify-between">
          <div className="flex flex-row space-x-2">
            <Button
              variant="outlined"
              onClick={() => {
                handleDownload();
              }}
            >
              Download PDF
            </Button>
            {isCurrent && (
              <Tag color={bill.status == 1 ? "orange" : "red"}>
                {bill.status == 2
                  ? "Unpaid"
                  : `Due by penalty : $${bill.penaltyamount}`}
              </Tag>
            )}
          </div>
          {isCurrent && (
            <Button
              variant="contained"
              onClick={() => {
                fetcher({
                  endPoint: "User/PayBill",
                  method: "PUT",
                  body: bill,
                }).then((res) => {
                  if (res.ok) {
                    loadData();
                    messageApi.open({
                      type: "success",
                      content: "Bill has been paid",
                    });
                  } else {
                    messageApi.open({
                      type: "warning",
                      content: "Unable to pay bill",
                    });
                  }
                });
              }}
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
export default Bill;
