import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../services/baseServices";

export default function Sidebar() {
  const router = useRouter();
  let path = usePathname();
  path = path.split("/");
  path = path[path.length - 1];
  const menus = ["currentbills", "history", "account-info"];

  return (
    <div className=" w-1/5 flex flex-col justify-between items-start bg-black text-white rounded-lg">
      <h1 className="text-3xl font-mono font-bold p-3">GenEB</h1>
      <div className="flex flex-col w-full pl-2 text-white space-y-3 font-mono">
        {menus.map((item) => {
          return (
            <Link
              href={`/home/${item}`}
              className={`p-2 rounded-l-md no-underline ${
                path == item.toLocaleLowerCase()
                  ? "bg-white text-black"
                  : "text-white"
              }`}
            >
              {item}
            </Link>
          );
        })}
      </div>
      <div className="flex w-full">
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="bg-white p-2 m-2 w-full rounded-md cursor-pointer hover:bg-slate-200 font-sans font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
