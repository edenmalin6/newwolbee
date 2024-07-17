import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TiPin } from "react-icons/ti";
import { useParams } from "react-router-dom";

export const ProjectDetails = () => {
  const { employeeId } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [importanceLevels, setImportanceLevels] = useState({
    management: "High",
    turnover: "Medium",
    workLifeBalance: "Low",
    managerialAttention: "High",
    professionalism: "Low",
  });
  useEffect(() => {
    const employeesArr = localStorage.getItem("employeesArr");
    const currentManagerEmployeesArr = JSON.parse(employeesArr) || [];
    const employee = currentManagerEmployeesArr.find(
      (emp) => emp._id === employeeId
    );
    setSelectedEmployee(employee);
  }, [employeeId]);

  if (!selectedEmployee) {
    return <div>No employees have been added yet...</div>;
  }

  const circleContainerStyle = {
    width: "120px",
    margin: "10px",
    position: "relative",
    transition: "transform 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    overflow: "hidden",
  };

  const circleTextStyle = {
    fontSize: "12px",
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
    height: "20px",
    marginTop: "30px",
  };

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  };

  const experienceData = [
    {
      id: 1,
      name: "Compensation",
      time: "21/08/2023",
    },
    {
      id: 2,
      name: "Development plan",
      time: "10/01/2024",
    },
    {
      id: 3,
      name: "Personal interview",
      time: "17/04/2024",
    },
  ];

  const titleStyle = {
    textAlign: "center",
    marginTop: "0",
  };

  const paragraphStyle = {
    position: "relative",
    paddingLeft: "35px",
    marginBottom: "10px",
    fontSize: "16px",
  };

  const iconStyle = {
    position: "absolute",
    left: "25px",
    // top: '10px',
    // transform: 'translateY(-50%)',
    color: "#FF902F",
  };

  const pinIconSize = 24;

  const getColor = (importance) => {
    switch (importance) {
      case "High":
        return "#FF0000";
      case "Medium":
        return "#FFA500";
      case "Low":
        return "#008000";
      default:
        return "#000000";
    }
  };

  const containerStyle = {
    display: "flex",
    gap: "15px",
  };

  const boxStyle = {
    backgroundColor: "#DCDCDC",
    width: "380px",
    height: "400px",
    padding: "20px",
    marginBottom: "20px",
    border: "solid black 0.3px",
    borderRadius: "10px",
  };

  return (
    <div className="tab-content">
      <div className="pro-overview tab-pane fade show active" id="emp_assets">
        <div style={containerStyle}>
          <div style={boxStyle}>
            <h3 style={titleStyle}>Wolbee’s Top Insights</h3>
            <hr />
            <div style={{ marginLeft: "15px" }}>
              {selectedEmployee.TopInsights && selectedEmployee.TopInsights.map((insight, index) => {
                let parsedInsight;
                try {
                  parsedInsight = JSON.parse(insight);
                  console.log(parsedInsight);
                } catch (error) {
                  console.error("Failed to parse TopInsights JSON:", error);
                  parsedInsight = {}; // או כל ברירת מחדל
                }
                return Object.values(parsedInsight).map((info, i) => (
                  <div key={`${index}-${i}`}>
                    <br />
                    <TiPin style={iconStyle} size={pinIconSize}></TiPin> {info}
                  </div>
                ));
              })}
            </div>
          </div>
          <div style={boxStyle}>
            <h3 style={titleStyle}>Latest Insights</h3>
            <hr />
            <div style={{ marginLeft: "15px" }}>
              {selectedEmployee.LatestInfo && selectedEmployee.LatestInfo.map((insight, index) => {
                let parsedInsight;
                try {
                  parsedInsight = JSON.parse(insight);
                } catch (error) {
                  console.error("Failed to parse TopInsights JSON:", error);
                  parsedInsight = {}; // או כל ברירת מחדל
                }
                return Object.values(parsedInsight).map((info, i) => (
                  <div key={`${index}-${i}`}>
                    <br />
                    <TiPin
                      style={{
                        position: "absolute",
                        left: "415px",
                        color: "#FF902F",
                      }}
                      size={pinIconSize}
                    ></TiPin>{" "}
                    {info}
                  </div>
                ));
              })}
            </div>

            <div style={{ marginLeft: "15px" }}></div>
          </div>

          <div className="col-md-6 d-flex" style={{ width: "450px" }}>
            <div className="card profile-box flex-fill">
              <div className="card-body">
                <h3 style={titleStyle}>Latest Activity</h3>
                <hr />

                <div className="experience-box">
                  <div style={{ marginLeft: "15px" }}>
                    {selectedEmployee.LatestInfo && selectedEmployee.LatestInfo.map((insight, index) => {
                      let parsedInsight;
                      try {
                        parsedInsight = JSON.parse(insight);
                      } catch (error) {
                        console.error(
                          "Failed to parse TopInsights JSON:",
                          error
                        );
                        parsedInsight = {}; // או כל ברירת מחדל
                      }
                      return Object.values(parsedInsight).map((info, i) => (
                        <div key={`${index}-${i}`}>
                          <br></br>
                          <span className="arrow">▼</span>
                          {info}
                        </div>
                      ));
                    })}
                  </div>
                </div>

                {/* <ul className="experience-list">
    {selectedEmployee.LastestActivity.map((item, index) => (
      <li key={index}>
        <div className="experience-user">
          <div className="before-circle" />
        </div>
        <div className="experience-content">
          <div className="timeline-content">
            <Link to="/" className="name">
              {item.date}
            </Link>
            <span className="time">{item.Activity}</span>
          </div>
        </div>
      </li>
    ))}
  </ul> */}
              </div>
            </div>
          </div>
        </div>
        <div style={wrapperStyle}>
          <div style={circleContainerStyle}>
            <h4 style={circleTextStyle}>Management</h4>
            <CircularProgressbar
              value={100}
              text={importanceLevels.management}
              styles={buildStyles({
                textSize: "10px",
                textColor: "black",
                pathColor: getColor(importanceLevels.management),
                trailColor: "#d6d6d6",
                pathTransitionDuration: 0.5,
                trailTransitionDuration: 0.5,
                pathTransition: "stroke-dashoffset 0.5s ease 0s",
              })}
            />
          </div>
          <div style={circleContainerStyle}>
            <h4 style={circleTextStyle}>Turnover</h4>
            <CircularProgressbar
              value={100}
              text={importanceLevels.turnover}
              styles={buildStyles({
                textSize: "10px",
                textColor: "black",
                pathColor: getColor(importanceLevels.turnover),
                trailColor: "#d6d6d6",
                pathTransitionDuration: 0.5,
                trailTransitionDuration: 0.5,
                pathTransition: "stroke-dashoffset 0.5s ease 0s",
              })}
            />
          </div>
          <div style={circleContainerStyle}>
            <h4 style={circleTextStyle}>Work-Life</h4>
            <CircularProgressbar
              value={100}
              text={importanceLevels.workLifeBalance}
              styles={buildStyles({
                textSize: "10px",
                textColor: "black",
                pathColor: getColor(importanceLevels.workLifeBalance),
                trailColor: "#d6d6d6",
                pathTransitionDuration: 0.5,
                trailTransitionDuration: 0.5,
                pathTransition: "stroke-dashoffset 0.5s ease 0s",
              })}
            />
          </div>
          <div style={circleContainerStyle}>
            <h4 style={circleTextStyle}>Managerial</h4>
            <CircularProgressbar
              value={100}
              text={importanceLevels.managerialAttention}
              styles={buildStyles({
                textSize: "10px",
                textColor: "black",
                pathColor: getColor(importanceLevels.managerialAttention),
                trailColor: "#d6d6d6",
                pathTransitionDuration: 0.5,
                trailTransitionDuration: 0.5,
                pathTransition: "stroke-dashoffset 0.5s ease 0s",
              })}
            />
          </div>
          <div style={circleContainerStyle}>
            <h4 style={circleTextStyle}>Professional</h4>
            <CircularProgressbar
              value={100}
              text={importanceLevels.professionalism}
              styles={buildStyles({
                textSize: "10px",
                textColor: "black",
                pathColor: getColor(importanceLevels.professionalism),
                trailColor: "#d6d6d6",
                pathTransitionDuration: 0.5,
                trailTransitionDuration: 0.5,
                pathTransition: "stroke-dashoffset 0.5s ease 0s",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListItem = ({ title, text }) => (
  <li>
    <div className="title">{title}</div>
    <div className="text">{text}</div>
  </li>
);

export default ProjectDetails;
