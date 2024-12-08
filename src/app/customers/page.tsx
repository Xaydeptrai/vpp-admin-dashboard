import React from "react";
import DataTable from "@/components/DataTable"; // Assuming DataTable is in components folder

const columns = [
  {
    title: "Course Name",
    dataIndex: "courseName",
    key: "courseName",
    searchable: true,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
    searchable: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const data = [
  { id: 1, courseName: "Design Accessibility", duration: "5 hours", level: "Advanced", status: "Completed" },
  { id: 2, courseName: "UX Research", duration: "6 hours", level: "Intermediate", status: "In Progress" },
  { id: 3, courseName: "Figma for Beginners", duration: "9 hours", level: "Advanced", status: "Completed" },
  { id: 4, courseName: "HTML & CSS", duration: "9 hours", level: "Advanced", status: "Completed" },
  { id: 5, courseName: "Java for Beginners", duration: "9 hours", level: "Intermediate", status: "In Progress" },
];

export default function Customers() {
  return (
    <DataTable columns={columns} data={data} title="Learning Progress" />
  );
}
