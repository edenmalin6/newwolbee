import React, { useState, useEffect } from "react";
import { Avatar_02 } from "../../../Routes/ImagePath";
import { Link, useParams } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import Breadcrumbs from "../../../components/Breadcrumbs";
import moment from "moment";
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
import { TiPin } from "react-icons/ti";
const Profile = () => {
  const { employeeId } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  //no need for this because the avatars are already stored in the localStorage for each employee
  // const avatars = {
  //   '1': brad,
  //   '2': john,
  //   '3': lisa,
  //   '4': tom,
  //   '5': david,
  //   '6': nicole,
  //   '7': sofia,
  //   '8': emma,
  //   '9': mark,
  //   '10': josh,
  //   '11': justin,
  //   '12': selena
  // };

  useEffect(() => {
    const employeesArrJson = localStorage.getItem('employeesArr');
    const currentManagerEmployeesArr = JSON.parse(employeesArrJson);
    const employee = currentManagerEmployeesArr.find(emp => emp.id === (employeeId));
    setSelectedEmployee(employee);
  }, [employeeId]);

  if (!selectedEmployee) {
    return <div>No employees have been added yet...</div>;
  }

  const formattedDateOfBirth = moment(selectedEmployee.DataOfBirth, 'DD/MM/YYYY').format('MMMM Do, YYYY');

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
        <h1>   {selectedEmployee.fullName} Profile</h1>
        <br />
        <br />
        
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <Link to="#">
                        <img src={selectedEmployee.avatar} alt="UserImage" /> 
                        </Link>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {selectedEmployee.fullName}
                            </h3>
                            <h6 className="text-muted">{selectedEmployee.role}</h6>
                            {/* <div className="staff-id">
                              Employee ID: {selectedEmployee.id}
                            </div>
                            <div className="small doj text-muted">
                              Employee of manager ID#: {selectedEmployee.employeeOfManagerId}
                            </div>
                            <div className="staff-msg">
                              <Link className="btn btn-custom" to="/call/chat">
                                Send Message
                              </Link>
                            </div> */}
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <Link to={`tel:050-1234567`}>
                                  050-1234567
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Mail:</div>
                              <div className="text">
                                <Link to={`mailto:${selectedEmployee.fullName}@gmail.com`}>
                                  {selectedEmployee.fullName + '@gmail.com'}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Place of residence:</div>
                              <div className="text">{selectedEmployee.PlaceOfResidence}</div>
                            </li>
                            {/* <li>
                              <div className="title">Birthday:</div>
                              <div className="text">{formattedDateOfBirth}</div>
                            </li>
                            <li>
                              <div className="title">Status:</div>
                              <div className="text">{selectedEmployee.FamilyStatus}</div>
                            </li>
                            <li>
                              <div className="title">Number of children:</div>
                              <div className="text">
                                {selectedEmployee.NumOfChildren}
                              </div>
                            </li>
                            <li>
                              <div className="title">Interesting fact:</div>
                              <div className="text">
                                {selectedEmployee.InterestingFact}
                              </div>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit">
                      <Link
                        data-bs-target="#profile_info"
                        data-bs-toggle="modal"
                        className="edit-icon"
                        to="#"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">

<li className="nav-item">
                    <Link
                      to="#emp_assets"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                     | Insights |
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#emp_profile"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                     | General info |
                    </Link>
                  </li>

   

                  <li className="nav-item">
                    <Link
                      to="#emp_projects"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                     | Training and development |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      | Interviews |
                      <small className="text-danger ms-1"></small>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      | Compensation and benefits |
                      <small className="text-danger ms-1"></small>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      | Wellness and engagement |
                      <small className="text-danger ms-1"></small>
                    </Link>
                  </li>
               
                </ul>
              </div>
            </div>
          </div>
          {/* Profile Info Tab */}
          <ProfileTab />
        </div>
      </div>
    </>
  );
};

export default Profile;
