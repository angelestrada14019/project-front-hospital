import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const Main = (props) => {

    
    const navigate = useNavigate();
    

    const validateTokenSignIn = () => {
        const token = localStorage.getItem("token");
        try {
          const decode = jwtDecode(token);
          if (decode.exp < Date.now() / 1000) {
            localStorage.removeItem("token");
            navigate("/");
          }
          jwtDecode(token);
         // navigate("/home");
        } catch (error) {
          console.log(error);
          navigate("/");
        }
      };
      //...........................................
      useEffect(() => {
          
        validateTokenSignIn();
      }, []);

  return (
    <>  

        <div className="App">
        <div className="AppGlass">
          <Sidebar />
          {props.children}
        </div>
      </div>

    </>
  )
}

export default Main