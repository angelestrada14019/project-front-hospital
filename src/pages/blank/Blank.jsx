import React from 'react'
import Sidebar from "../../components/Sidebar";
import './blank.css'
const Blank = (props) => {
  return (
    <>     
        <div className="App">
        <div className="AppGlass">
          <Sidebar />
          {props.title}
        </div>
      </div>

    </>
  )
}

export default Blank