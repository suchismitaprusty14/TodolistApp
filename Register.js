import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authstyle.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setuUsername] = useState("");
  const Navigate = useNavigate();

  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password, username };
      const res = await AuthServices.registerUser(data);
      console.log(res.data);
      Navigate("/home");
      toast.success("user registered successfully !!!");
    } catch (err) {
      console.log(err);
      toast.error(getErrorMessage(err));
    }
  };
  return (
    <div className="form-container">
      <div className="form">
        <div className="mb-3">
          <i className="fa-solid fa-circle-user"></i>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="enter username"
            value={username}
            onChange={(e) => {
              setuUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-bottom">
          <p className="text-center">
            alredy a user?
            <Link to="/login">Login</Link>
          </p>
          <button type="submit" className="login-btn" onClick={registerHandler}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
