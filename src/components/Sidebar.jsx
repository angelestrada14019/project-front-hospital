import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import {Link, useLocation} from 'react-router-dom'
const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);
  const location = useLocation();

  useEffect(() => {
      const currentPath = window.location.pathname.split("/")[1];
      const activeItem = SidebarData.findIndex(
          (item) => item.section === currentPath
      );
      setSelected(currentPath.length===0? 0 : activeItem);
  }, [location]);

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <span>
          Admin<span>Hospital</span>
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => (
          
            <Link to={item.path}
              className={selected === index ? "menuItem active" : "menuItem"}
              key={ `${item.section}-${index}` }
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          
        ))}
        {/* signoutIcon */}
        <div className="menuItem">
          <UilSignOutAlt />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
