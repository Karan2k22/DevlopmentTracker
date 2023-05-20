import React from "react";
import { useRef } from "react";
import "./Header.css";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
const Header = () => {
  const navref = useRef();
  const showNavBar = () => {
    navref.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <div style={{ marginTop: "20px" , borderRight:"2px solid black", margin:"10px"}}>
        <img
          src="https://dirums.com/images/logo%20and%20bird.webp"
          width="130px"
          height="90px"
        />
      </div>
      <nav ref={navref}>
        <h3>Website Devlopment Tracker</h3>
        {/* <Link to="/">Home</Link>
        <Link to='/About'>About</Link>
        <Link to='/Skill'>Skills</Link>
        <Link to='/Project'>Project</Link>
        <Link to='/Contact'>Conatct</Link> */}

        {/* <button className="nav-close" onClick={showNavBar}>
          <ImCross />
        </button> */}
      </nav>

      {/* <button className="nav-btn" onClick={showNavBar}>
        <AiOutlineMenu />
      </button> */}
    </header>
  );
};

export default Header;
