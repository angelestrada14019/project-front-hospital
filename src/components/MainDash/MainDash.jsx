import React,{useState,useEffect} from 'react'
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import ApiCall from "../../utils/ApiCall";
const MainDash = () => {
    const [usuarios,setUsuarios] = useState([
        {
            id:0,
            email:"",
            perfil_id:"",

        }
    ]);
    const formatUsuarios = (usuarios,perfiles) => {       
        let usuariosFormatted = [];
      
        usuarios.forEach((usuario) => {
            let perfil = perfiles.filter(perfil => perfil.id === usuario.perfil_id)[0].nombre;            
            usuariosFormatted.push({
                id: usuario.id,
                email: usuario.email,
                perfil_id: perfil
            })
        }
        )
        return usuariosFormatted;
    }

    const getUsuarios = async () => {
        const response = await ApiCall.invokeGET(`/usuario`);
        setUsuarios(formatUsuarios(response.body, await getPerfiles()));
              
        
    }
    const getPerfiles = async () => {
        const response = await ApiCall.invokeGET(`/perfil`);
        return response.body;
      
    }
    useEffect(()=>{
        getUsuarios();
    },[])
 

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <h2>Usuarios</h2>
      <Table dataRows={usuarios}/>
    </div>
  );
};

export default MainDash;
