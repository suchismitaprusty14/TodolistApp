import React, { useEffect, useState } from "react";
import todoimage from "../../assets/images/hero.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navabar = () => {
  const [username, setusername] = useState("");
  const Navigate = useNavigate();
  //logout function
  const logOutClick = () => {
    localStorage.removeItem("todoapp");
    toast.success("logout successfully");
    Navigate("/login");
  };

  //getusername
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    setusername(userData && userData.user.username);
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="navbar-brand d-flex">
              <img src={todoimage} alt="logo" height={50} width={50} /> Welcome
              <p
                style={{
                  marginLeft: "10px",
                }}
              >
                {username}
              </p>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todolist">
                  MyTodo
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={logOutClick}
                  title="logout"
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  className="nav-link"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navabar;
