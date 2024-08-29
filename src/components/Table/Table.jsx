"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FcCancel } from "react-icons/fc";
import { HiPencilSquare } from "react-icons/hi2";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

const theme = createTheme({
  palette: {
    mode: "dark", // Change to 'light' for light mode
  },
});

export default function UserTable({ data, currentPage }) {
  const [extra, setExtra] = React.useState(
    Array.from({ length: 20 }, () => false)
  );
  const modalRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setExtra((prev) => prev.map(() => false));
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // <TableContainer component={Paper}>
    <table className=" w-full h-screen mt-4">
      {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
      {/* <TableHead  className=" dark:bg-slate-900"> */}
      <thead className=" dark:bg-slate-900">
        <tr>
          <th align="center" className=" font-bold text-xl">
            S.No
          </th>
          <th align="center" className=" font-bold text-xl">
            Name
          </th>
          <th align="center" className=" font-bold text-xl">
            Email
          </th>
          <th align="center" className=" font-bold text-xl">
            UserId
          </th>
          <th align="center" className=" font-bold text-xl">
            Role
          </th>
          {/* <TableCell align="center" className=" font-bold text-xl">S.No</TableCell>
            <TableCell align="center" className=" font-bold text-xl">Name</TableCell>
            <TableCell align="center" className=" font-bold text-xl">Email</TableCell>
            <TableCell align="center" className=" font-bold text-xl">UserId</TableCell>
            <TableCell align="center" className=" font-bold text-xl">Role</TableCell> */}
        </tr>
      </thead>
      <tbody>
        {data?.map((user, index) => (
          <tr
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {/* <TableCell align="center">{index+1}</TableCell> */}
            <td align="center">{(currentPage - 1) * 20 + index + 1}</td>
            <td component="th" scope="row" align="center">
              {user.name}
            </td>
            <td align="center">{user.email}</td>
            <td align="center">{user._id}</td>
            <td align="center">{user.role}</td>
            <td
              align="center"
              className=" hover:bg-gray-300  w-8 h-8 rounded-full cursor-pointer"
              onClick={() =>
                setExtra((prev) => {
                  const newExtra = Array.from({ length: 20 }, () => false);
                  newExtra[index] = !newExtra[index];
                  return newExtra;
                })
              }
            >
              <div className=" relative">
                <BsThreeDotsVertical className=" text-sm" />
                {extra[index] && (
                  <div
                    ref={modalRef}
                    className=" bg-white shadow-xl shadow-gray-600 dark:bg-slate-900 rounded-lg p-2 absolute right-8 top-4 transition-all ease-linear"
                  >
                    <Link href={`/users/userAccess/${user._id}`}>
                      <div className=" flex gap-2 items-center cursor-pointer p-1">
                        <FcCancel className=" text-xl" />
                        <h2 className=" text-sm text-nowrap font-medium ">
                          Ban User
                        </h2>
                      </div>
                    </Link>
                    <Link href={`/users/editUser/${user._id}`}>
                      <div className=" flex gap-2 items-center cursor-pointer p-1">
                        <HiPencilSquare className=" text-green-500" />
                        <h2 className=" text-sm text-nowrap font-medium ">
                          Edit details
                        </h2>
                      </div>
                    </Link>
                    <Link href={`/addproperties/${user._id}/${user.email}`}>
                      {/* <Link
                      href={{
                        pathname: `/addproperties/${user._id}`,
                        query: { email: user.email },
                      }}
                    > */}
                      <div className=" flex gap-2 items-center cursor-pointer p-1">
                        <FaPlusCircle className=" text-green-600" />
                        <h2 className=" text-sm text-nowrap font-medium hover:text-gray-600">
                          Add Property
                        </h2>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {/* </Table> */}
    </table>
  );
}
