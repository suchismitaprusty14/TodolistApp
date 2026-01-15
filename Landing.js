import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../assets/images/hero.jpg";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="hero">
      <div className="intro-text">
        <h1>
          <span className="tagline1">Organize Work and Life</span>
          <br />
          <span className="tagline2">finally.</span>
        </h1>
        <p>
          type just anything into the task field and Todolist <br />
          on-of-it's-kind natural language recognition will instantly fill
          to-do-list
        </p>
        <Link className="btn red" to="/register">
          Register
        </Link>
        <Link className="btn blue" to="/login">
          Login
        </Link>
      </div>
      <div className="">
        <img src={Hero} alt="Heroimage" width={"100%"} height={515} />
      </div>
    </div>
  );
};

export default Landing;
