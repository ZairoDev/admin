import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function UserTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className=" font-bold text-xl">S.No</TableCell>
            <TableCell align="center" className=" font-bold text-xl">Name</TableCell>
            <TableCell align="center" className=" font-bold text-xl">Email</TableCell>
            <TableCell align="center" className=" font-bold text-xl">UserId</TableCell>
            <TableCell align="center" className=" font-bold text-xl">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((user, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index+1}</TableCell>
              <TableCell component="th" scope="row" align="center">
                {user.name}
              </TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user._id}</TableCell>
              <TableCell align="center">{user.role}</TableCell>
              <TableCell align="center">
                <BsThreeDotsVertical className=" cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
