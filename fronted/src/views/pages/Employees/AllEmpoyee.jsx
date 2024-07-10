import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import lisa from '../../../imgs/avatar_1.JPG'
import tom from '../../../imgs/avatar_2.JPG'
import david from '../../../imgs/avatar_3.JPG'
import nicole from '../../../imgs/avatar_4.JPG'
import brad from '../../../imgs/avatar_5.JPG'
import john from '../../../imgs/avatar_6.JPG'
import mark from '../../../imgs/avatar_7.JPG'
import josh from '../../../imgs/avatar_8.JPG'
import justin from '../../../imgs/avatar_9.JPG'
import selena from '../../../imgs/avatar_10.JPG'
import emma from '../../../imgs/avatar_11.JPG'
import sofia from '../../../imgs/avatar_12.JPG'
import PopUp from "./PopUp";
const AllEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [favoriteEmployees, setFavoriteEmployees] = useState([]);

  const avatars = [lisa, tom, david, nicole,john , emma, brad, josh, justin, selena, mark, sofia]
  const toggleFavorite = (event, employeeId) => {
    event.preventDefault(); // מניעת התנהגות ברירת המחדל של הלינק
    const updatedFavoriteEmployees = [...favoriteEmployees]; // העתקת רשימת העובדים המועדפים
    
    if (updatedFavoriteEmployees.includes(employeeId)) {
      updatedFavoriteEmployees.splice(updatedFavoriteEmployees.indexOf(employeeId), 1); // הסרת העובד מרשימת המועדפים
    } else {
      updatedFavoriteEmployees.push(employeeId); // הוספת העובד לרשימת המועדפים
    }
  
    setFavoriteEmployees(updatedFavoriteEmployees); // עדכון רשימת העובדים המועדפים
  };
  

 
  useEffect(() => {
    const manager = localStorage.getItem('credencial');
    const currentLoggedInManager = JSON.parse(manager);

    fetch('https://newwolbee-1.onrender.com/findemployees', {
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(currentLoggedInManager)
    })
      .then(res => res.json())
      .then(data => {
        // Adding local avatar paths to employees
        const employeesWithAvatars = data.map((employee, index) => ({
          ...employee,
          avatar: `../imgs/avatar_${index + 1}.jpg`
        }));
        localStorage.setItem('employeesArr', JSON.stringify(employeesWithAvatars));
        setEmployees(employeesWithAvatars);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <style>
        {`
          .favorite-star {
            position: absolute;
            top: -40px;
            left: -70px;
            font-size: 24px;
            color: grey;
            cursor: pointer;
          }

          .favorite-star.active {
            color: yellow;
          }
        `}
      </style>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle='Employees Page'
            
            modal="#add_employee"
            name="Add Employee"/>
          <EmployeeListFilter />

          <div className="row">
            {employees.map((employee,index) => (
              <div
                className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                key={employee.id}
              >
                <div className="profile-widget">
                <div className="profile-img">
                <Link 
  to={`/profile/${employee.id}`} 
  className="avatar" 
  onClick={(event) => toggleFavorite(event, employee.id)}
>
  <span 
    className={`favorite-star ${favoriteEmployees.includes(employee.id) ? 'active' : ''}`}
  >
    &#9734;
  </span>
  <img src={avatars[index % avatars.length]} alt={`${employee.fullName} Avatar`} />
</Link>

</div>
                  <div className="dropdown profile-action">
                    <Link
                      to="#"
                      className="action-icon dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="material-icons">more_vert</i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_employee"
                      >
                        <i className="fa fa-pencil m-r-5" /> Edit
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete"
                      >
                        <i className="fa-regular fa-trash-can m-r-5" /> Delete
                      </Link>
                    </div>
                  </div>
                  <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                    <Link to={`/profile/${employee.id}`}>{employee.fullName}</Link>
                  </h4>
                  <div className="small text-muted">{employee.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AllEmployeeAddPopup  />
      <DeleteModal Name="מחק עובד" />
    </div>
  );
};

export default AllEmployee;
