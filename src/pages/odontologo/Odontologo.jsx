import React,{useState,useEffect} from 'react'
import Main from "../../layout/Main";
import Table from "../../components/Table/Table";
import ApiCall from "../../utils/ApiCall";
import './odontologo.css';
const Odontologo = (props) => {


    const [odontologos,setOdontologos] = useState([
        {
            id:0,
            nombre:"",
            apellido:"",
            matricula:"",
        }
    ])

    const getOdontologos = async () => {
        const response = await ApiCall.invokeGET(`/odontologo`);
        setOdontologos(response.body);
    }

    useEffect(()=>{
        getOdontologos();
    },[])

  return (
      <Main>
    <div className='odontologo'>
        <div className="title_odontologo">
            <h1>{props.title}</h1>
        </div>
        <Table title="" dataRows={odontologos}/>
    </div>
    </Main>
  )
}

export default Odontologo