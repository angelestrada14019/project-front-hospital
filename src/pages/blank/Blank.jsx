import React from 'react'
import Main from '../../layout/Main';
import './blank.css'
const Blank = (props) => {
  return (
    <>     
       <Main>
           {props.title}
       </Main>

    </>
  )
}

export default Blank