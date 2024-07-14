import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../../layout/Header";
import Select from "react-select";
import employee1 from "../../../../../imgs/avatar_4.JPG";
import employee2 from "../../../../../imgs/avatar_5.JPG";
import employee3 from "../../../../../imgs/avatar_6.JPG";
import employee4 from "../../../../../imgs/avatar_7.JPG";
import employee5 from "../../../../../imgs/avatar_8.JPG";
import employee6 from "../../../../../imgs/avatar_10.JPG";
import employee7 from "../../../../../imgs/avatar_11.JPG";


//to get to this page "/hr-employeesData"

const EmployeesData = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [values, setValues] = useState([]);

 
    const employees = [
      {
        id: 1,
        image: employee1,
        name: "John Doe",
        role: "Web Designer",
        team: "UI/UX",
        employee_id: "FT-0001",
        email: "johndoe@example.com",
        mobile: "9876543210",
        joindate: "1 Jan 2023",
      },
      {
        id: 2,
        image: employee2,
        name: "Richard Miles",
        role: "Web Developer",
        team: "Backend",
        employee_id: "FT-0002",
        email: "richardmiles@example.com",
        mobile: "9876543210",
        joindate: "18 Mar 2014",
      },
      {
        id: 3,
        image: employee3,
        name: "John Smith",
        role: "Android Developer",
        team: "Backend",
        employee_id: "FT-0003",
        email: "johnsmith@example.com	",
        mobile: "9876543210",
        joindate: "1 Apr 2014",
      },
      {
        id: 4,
        image: employee4,
        name: "Mike Litorus",
        role: "IOS Developer",
        team: "Backend",
        employee_id: "FT-0004",
        email: "mikelitorus@example.com",
        mobile: "9876543210",
        joindate: "1 Apr 2014",
      },
      {
        id: 5,
        image: employee5,
        name: "Wilmer Deluna",
        role: "Team Leader",
        team: "UI/UX",
        employee_id: "FT-0005",
        email: "wilmerdeluna@example.com",
        mobile: "9876543210",
        joindate: "22 May 2014",
      },
      {
        id: 6,
        image: employee6,
        name: "Jeffrey Warden",
        role: "Web Developer",
        team: "Frontend",
        employee_id: "FT-0006",
        email: "jeffreywarden@example.com",
        mobile: "9876543210",
        joindate: "16 Jun 2023",
      },
      {
        id: 7,
        image: employee7,
        name: "Bernardo Galaviz",
        role: "Web Developer",
        team: "Frontend",
        employee_id: "FT-0007",
        email: "bernardogalaviz@example.com",
        mobile: "9876543210",
        joindate: "1 Jan 2023",
      },
    ];
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/teams");
        setValues(response.data);
      } catch (error) {
        console.error("Error fetching team :", error);
      }
    };
    fetchTeams();
  }, []);

  const handleSelect = (option) => {
    setSelectedTeam(option.value);
  }


    const smallprojectCardStyle={
        width: '250px',
        boxSizing: 'border-box',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        padding: '20px',
        background: '#fff',
        margin: '10px',
        
      }
    
      const projectCardStyle = {
        width: '300px',
        height:'300px',
        boxSizing: 'border-box',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        padding: '20px',
        background: '#fff',
        margin: '10px', // Small margin between cards
      };
      
      const imageContainerStyle = {
        width: '100px',
        height: '100px',
        margin: '0 auto 10px',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #ddd',
      };
      
      const imgStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: '50%',
      };
      
      const projectDetailsTextStyle = {
        padding: '10px',
      };
      
      const h3Style = {
        fontSize: "18px",
        margin: "10px 0",
      };
    
      const pStyle = {
        fontSize: "14px",
        color: "#555",
        margin: "5px 0",
      };
  
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Header />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Select
          options={values.map((team) => ({
            value: team,
            label: team.name,
          }))}
          onChange={handleSelect}
          placeholder="Select a team"
          className="w-50 m-3"
        />
      </div>
        <div className="d-flex justify-content-center">
        <div
            className="project-card"
            style={projectCardStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        
        >
            <div className="image-container" style={imageContainerStyle}>
            <img src={employee1} alt="Project One" style={imgStyle} />
            </div>
            <div className="project-details" style={projectDetailsTextStyle}>
            <h1 style={h3Style}>International Pizza Day</h1>
            <h4 style={pStyle}>10.6.2024</h4>
            
            </div>
            <div className="dropdown profile-action" style={{border: 'none'}}>
          
            </div>
            </div>

        </div>
        
            
            
      </>
  );
};

export default EmployeesData;
