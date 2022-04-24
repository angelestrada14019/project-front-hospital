import React,{useState,useEffect} from 'react'
import Main from "../../layout/Main";
import Table from "../../components/Table/Table";
import ApiCall from "../../utils/ApiCall";
import './paciente.css'
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilPlus 
  } from "@iconscout/react-unicons";
import { Link } from 'react-router-dom';
const Paciente = (props) => {
    const [pacientes,setPacientes] = useState([
        {
            id:0,
            nombre:"",
            apellido:"",
            dni:"",
            fechaIngreso:"",
            domicilio_id:0,

        }
    ]); 
    const formatPacientes = (pacientes) => {
        console.log(pacientes);
        let pacientesFormatted = [];
        pacientes.forEach((paciente) => {
            pacientesFormatted.push({
                id: paciente.id,
                nombre: paciente.nombre,
                apellido: paciente.apellido,
                dni: paciente.dni,
                fechaIngreso: paciente.fechaIngreso,
                domicilio_id: paciente.domicilio_id.id
            })
        }
        )
        return pacientesFormatted;
    }
    const getPacientes = async () => {
        const response = await ApiCall.invokeGET(`/paciente`);
        console.log(response.body);
        setPacientes(formatPacientes(response.body));
        
    }
    useEffect(()=>{
        getPacientes();
    },[])

  return (
      <Main>
    <div className='paciente'>
        <div className="title_paciente">
        <h1>{props.title}</h1>
        <Link to="/pacientes/new">
            <UilPlus size={30} color="#345678" />
        </Link>
        </div>
        <Table dataRows={pacientes}/>
    </div>
    </Main>
  )
}

export default Paciente