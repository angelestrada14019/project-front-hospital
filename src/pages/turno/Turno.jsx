import React,{useState,useEffect} from 'react'
import Main from "../../layout/Main";
import Table from "../../components/Table/Table";
import ApiCall from "../../utils/ApiCall";
import './turno.css';
const Turno = (props) => {


    const [turnos,setTurnos] = useState([
        {
            id:0,
            fecha:"",
            hora:"",
            odontologo_id:0,
            paciente_id:0,
        }
    ])
    const formatTurnos = (turnos) => {
        console.log(turnos);
        let turnosFormatted = [];
        turnos.forEach((turno) => {
            turnosFormatted.push({
                id: turno.id,
                fecha: turno.fecha,
                hora: turno.hora,
                odontologo_id: turno.odontologo_id.id,
                paciente_id: turno.paciente_id.id
            })
        }
        )
        return turnosFormatted;
    }

    const getOdontologos = async () => {
        const response = await ApiCall.invokeGET(`/turno`);
        console.log(response.body);
        setTurnos(formatTurnos(response.body));
        
    }

    useEffect(()=>{
        getOdontologos();
    },[])

  return (
      <Main>
    <div className='turno'>
        <div className="title_turno">
            <h1>{props.title}</h1>
        </div>
        <Table dataRows={turnos}/>
    </div>
    </Main>
  )
}

export default Turno