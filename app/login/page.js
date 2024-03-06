"use client";

import { React, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { login } from "../services/baseServices";
import { fetcher } from "../services/baseServices";

function Login() {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [hasInitiatedLogin, sethasInitiatedLogin] = useState(false);

  return (
    <div className="flex w-screen h-screen flex-row p-2">
      <div className="flex flex-col w-1/2 h-full justify-center items-center rounded-lg">
        <h2 className="text-7xl font-mono font-thin m-2">#Login.</h2>
        <form className="flex flex-col w-1/2  space-y-7 justify-top">
          <div className="flex flex-col space-y-7">
            <div className="w-full flex flex-col space-y-3">
              <TextField
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                id="username"
                label="Username"
                variant="outlined"
              />
              <TextField
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                id="password"
                label="Password"
                variant="outlined"
              />
            </div>

            <LoadingButton
              onClick={(e) => {
                sethasInitiatedLogin(true);
                login(username, password).then((status) => {
                  sethasInitiatedLogin(false);
                  if (status === 200) {
                    fetcher({
                      endPoint: "Admin/is-admin",
                      method: "GET",
                    }).then((res) => {
                      if (res.ok) {
                        router.push("/admin/dashboard");
                      } else {
                        router.push("/home/currentbills");
                      }
                    });
                  }
                });
              }}
              loading={hasInitiatedLogin}
              variant="outlined"
            >
              <span>Submit</span>
            </LoadingButton>
          </div>
        </form>
      </div>
      <div className="flex flex-col w-1/2 h-full justify-center items-start">
        <h1 className="text-9xl font-mono font-bold p-0 m-0">GenEB.</h1>
        <div className="flex flex-col w-full justify-start items-start">
          <h2 className="font-mono font-light">Modern way to pay EB bills</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
