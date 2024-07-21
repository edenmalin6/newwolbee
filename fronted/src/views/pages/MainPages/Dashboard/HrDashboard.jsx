import React from "react";
import Header from "../../../layout/Header";
import Sidebar from "../../../layout/Sidebar";
import HrStatistics from "./AdminDashboard/HrStatistics";

const userRole = localStorage.getItem("userRole")

export default function HrDashboard() {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Header />
          <Sidebar />
          <HrStatistics />
        </div>
      </div>
    </div>
  );
}
