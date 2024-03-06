// "use client";
// import { Button } from "@mui/material";
// import Link from "next/link";
// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           GenEB&nbsp;
//         </p>
//         <Button>
//           <Link href={`/login`}>Login</Link>
//         </Button>
//       </div>
//     </main>
//   );
// }

"use client";
import { Typography, Box, Button } from "@mui/material";
// import Box from '@mui/material/Box';
import Link from "next/link";
export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background: "rgb(0,29,36)",
        background:
          "radial-gradient(circle, rgba(236,244,243,1) 0%, rgba(5,21,54,1) 100%)",
      }}
    >
      <main className=" overflow-y-auto">
        <div>
          <Box display="flex" justifyContent="space-between" padding={5}>
            <h1>GenEB&nbsp;</h1>
            <Button variant="contained">
              <Link
                href={`/login`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="60vh"
          >
            <Typography variant="h3">
              Welcome to GenEB Electricity Portal
            </Typography>
            <br></br>

            <Typography variant="h4">Convenient. Secure. Reliable.</Typography>
            <br></br>

            <br></br>
            <Typography variant="h3">Get Started !</Typography>
          </Box>
        </div>
      </main>
    </Box>
  );
}
