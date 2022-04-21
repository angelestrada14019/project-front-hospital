import React from "react";
import MainDash from "../../components/MainDash/MainDash";

import Sidebar from "../../components/Sidebar";
const Home = () => {
  return (
    <>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <MainDash />
        </div>
      </div>
    </>
  );
};

export default Home;
