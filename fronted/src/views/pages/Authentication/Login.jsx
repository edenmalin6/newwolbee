import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useDispatch } from "react-redux";
import { login } from "../../../user";
import { resetFunctionwithlogin } from "../../../components/ResetFunction";
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});


const Login = () => {
  const [currentId, setCurrentId] = useState("");
  const [isUserExist, setIsUserExist] = useState(false); // המשתנה החדש

  const details = localStorage.getItem("loginDetails");
  const loginData = JSON.parse(details);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = async (data) => {
    try {
      // const response = await axios.post('https://newwolbee-1.onrender.com/login', {
            const response = await axios.post('http://localhost:5000/api/login', {
        email: data.email,
         password: data.password
      });
  
      const result = await response.data;

      if (response.status === 200) {
        setIsUserExist(true);
        const Value = {
          email: data.email,
          password: data.password,
          role: result.role
        };
        dispatch(login(Value));
        localStorage.setItem("credencial", JSON.stringify(Value));
        localStorage.setItem("userRole", (Value.role));
        if (result.role === "manager"){
          navigate("/hrDashboard")
        }else{
          navigate("/myDashboard"); 
        } 
     
        resetFunctionwithlogin();
      } else {
        setEmailError(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   checkCurrentId();
  //   setValue("email", localStorage.getItem("email"));
  //   setValue("password", localStorage.getItem("password"));
  // }, []);

  const checkCurrentId = () => {
    const storedId = localStorage.getItem("currentId");
    setCurrentId(storedId);
  };

  const [eye, seteye] = useState(true);

  const onEyeClick = () => {
    seteye(!eye);
  };

  return (
    <div>
   <div className="account-page" style={{ background: 'linear-gradient(to right, white, #FFC502, #FFEA00)' }}>

        <div className="main-wrapper">
          <div className="account-content">
            {/* <Link to="/job-list" className="btn btn-primary apply-btn"> */}
              {/* Apply Job */}
            {/* </Link> */}
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <Link to="#">
                  <img src={Applogo} alt="Dreamguy's Technologies" style={{width:'200px'}} />
                </Link>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {/* Account Form */}
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-block mb-4">
                        <label className="col-form-label">Email Address</label>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <input
                              className={`form-control ${
                                errors?.email ? "error-input" : ""
                              }`}
                              type="email"
                              defaultValue={localStorage.getItem("email")}
                              onChange={field.onChange}
                              value={field.value}
                              autoComplete="true"
                            />
                          )}
                        />

                        <span className="text-danger">
                          {" "}
                          {errors.email?.message}{" "}
                        </span>
                      </div>
                      <div className="input-block mb-4">
                        <div className="row">
                          <div className="col">
                            <label className="col-form-label">Password</label>
                          </div>
                          <div className="col-auto">
                            <Link className="text-muted" to="/forgot-password">
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                        <div style={{ position: "relative" }}>
                          <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                              <input
                                className={`form-control ${
                                  errors?.password ? "error-input" : ""
                                }`}
                                type={eye ? "password" : "text"}
                                defaultValue={localStorage.getItem("password")}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          <span
                            style={{
                              position: "absolute",
                              right: "5%",
                              top: "30%",
                            }}
                            onClick={onEyeClick}
                            className={`fa-solid ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            } `}
                          />
                        </div>
                        <span className="text-danger">
                          {" "}
                          {errors.password?.message}{" "}
                        </span>
                      </div>
                      <div className="input-block text-center">
                        <button
                          className="btn btn-primary account-btn"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="account-footer">
                      <p>
                        Don't have an account yet?{" "}
                        <Link to="/register">Register</Link>
                        </p>
                    </div>
                  </div>
                  {/* /Account Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* הדפסת הסטטוס של המשתמש - האם קיים או לא */}
      {isUserExist && <p>User exists in database</p>}
      {!isUserExist && <p>User does not exist in database</p>}
    </div>
  );
};

export default Login;
