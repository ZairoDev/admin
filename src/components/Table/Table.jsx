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
import { FaPlusCircle, FaQuestion } from "react-icons/fa";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "dark", // Change to 'light' for light mode
  },
});

export default function UserTable({ data, currentPage }) {
  const [deleteClick, setDeleteClick] = React.useState(false);

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

  const handleDelete = async (userId) => {
    setDeleteClick(true);
    try {
      const response = await axios.delete(`/api/deleteUser/${userId}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteModal = () => {
    return (
      <>
        <div className=" fixed top-0 right-0 bottom-0 left-0 bg-black/80 bg-opacity-50">
          <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900  dark:bg-slate-800 p-4 rounded-xl w-1/4 ">
            <div className=" flex flex-col items-center gap-1">
              <div className=" p-3 bg-red-700 rounded-full">
                <div className=" p-1 rounded-full bg-red-500">
                  <FaQuestion className=" text-red-800 text-xl" />
                </div>
              </div>
              <h1 className=" text-white font-extrabold text-2xl">
                Delete User ?
              </h1>
              <p className=" text-neutral-600">
                Deleting the user will remove it immediately.
              </p>
              <p className=" font-semibold text-neutral-600">
                This action cannot be undone.
              </p>
              <div className=" mt-2 w-4/5 flex justify-around">
                <button className=" px-3 py-2 w-1/3 text-sm rounded-lg dark:text-white font-medium bg-red-700 text-white hover:bg-red-600">
                  Yes, Delete it !
                </button>
                <button
                  className=" px-3 py-2 w-1/3 text-sm rounded-lg dark:text-white font-medium border-2 border-gray-700 hover:border hover:border-gray-800"
                  onClick={() => setDeleteClick(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    // <TableContainer component={Paper}>
    <table className={`w-full h-screen mt-4`}>
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
                    <div
                      className=" flex gap-2 items-center cursor-pointer p-1"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdDeleteForever className=" text-red-600" />
                      <h2 className=" text-sm text-nowrap font-medium hover:text-gray-600">
                        Delete User
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {deleteClick && deleteModal()}
      {/* </Table> */}
    </table>
  );
}
