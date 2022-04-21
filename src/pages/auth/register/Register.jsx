import React, { useState, useEffect } from "react";
import FormInput from "../../../components/form_input/FormInput";
import { useNavigate } from "react-router-dom";
import "./register.css";
import ApiCall from "../../../utils/ApiCall";
import Swal from "sweetalert2";
const Register = () => {
    //definir el estado inicial del usuario
    const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    clave: "",
    confirmPass: "",
    perfil_id: 1,
  });
 //.........................................
//definir iputs
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "colocar email valido",
      required: true,
    },
    {
      id: 2,
      name: "clave",
      type: "password",
      placeholder: "clave",
      label: "clave",
      errorMessage:
        "Contraseña entre 8 o mas caracteres, incluir al menos una letra mayuscula, una minuscula, un numero y un caracter especial",
      required: true,
      pattern: `(?=^.{8,}$)(?=.*)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$`,
    },
    {
      id: 3,
      name: "confirmPass",
      type: "password",
      placeholder: "Confirm clave",
      label: "Confirm clave",
      errorMessage: "Contraseñas no coinciden",
      required: true,
      pattern: values.clave,
    },
  ];
//.......................................
  //cargar perfiles
  const [perfiles, setStatePerfiles] = useState([]);

  const cargarPerfiles = async () => {
    const response = await ApiCall.invokeGET(`/perfil`);
    setStatePerfiles(response.body);
  };
  //...........useEffect 1...................
  useEffect(() => {
      //metodos que se lancen al montar el componente
      cargarPerfiles();
    }, []);
//..............................................
//cada que cambien los valores de los inputs se actualizan los valores del estado
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

//...........................................

//...........................................
//....................Crear cuenta............................
//crear cuenta...............................

  const crearCuenta = async () => {
    const data = {
      perfil_id: values.perfil_id,
      email: values.email,
      clave: values.clave,
    };
    const response = await ApiCall.invokePOST(`/auth/register`, data);
    const mensaje = response.mensaje;   
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: mensaje,
      });
      setValues({
        perfil_id: 1,
        nombre_usuario: "",
        email: "",
        clave: "",
        confirmPass: "",
      });
        navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Registro fallido",
        text: mensaje,
      });
    }
    
  };

//metodo para enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    crearCuenta();
  
    setValues({
        perfil_id: 1,
        email: "",
        clave: "",
        confirmPass: "",
      });
  };

  return (
    <div className="App register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <select
          id="perfil_id"
          value={values.perfil_id}
          name="perfil_id"
          onChange={onChange}
        >
          {perfiles.map((perfil) => (
            <option key={perfil.id} value={perfil.id}>
              {perfil.nombre}
            </option>
          ))}
        </select>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
