"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import React, { useEffect } from "react";
type Data = {
  name: string;
  email: string;
  role: string;
  status: string;
};

const DataTable = ({
  columns,
  action,
  data,
}: {
  columns: string[];
  action?: React.ReactNode;
  data: Data[];
}) => {
  if (data.length === 0) {
    return <p className="my-4 text-center">Không có dữ liệu</p>;
  }
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        {columns.map((column, index) => (
          <TableColumn key={index}>{column}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status ? "🟢" : "🔴"}</TableCell>
            <TableCell>{action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
