import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../../components/form_input/FormInput";
import "./login.css";
import ApiCall from "../../../utils/ApiCall";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
const Login = () => {
  //poder ir de un componente a otro
  const navigate = useNavigate();
  //definir el estado inicial del usuario
  const [values, setValues] = useState({
    email: "",
    clave: "",
  });
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
  ];
  //.......................................
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const validateTokenSignIn = () => {
    const token = localStorage.getItem("token");
    try {
      const decode = jwtDecode(token);
      if (decode.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        navigate("/");
      }
      jwtDecode(token);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  //...........................................
  useEffect(() => {
      
    validateTokenSignIn();
  }, []);

  const IniciarSesion = async () => {
    const data = {
      email: values.email,
      clave: values.clave,
    };
    const response = await ApiCall.invokePOST(`/auth/login`, data);
    try {
     // console.log(response.ok);
      const jwt = response.body.token;
      const id_usuario = response.body.usuarioDto.id;
      const perfil_id = response.body.usuarioDto.perfil_id;
      jwtDecode(jwt); //si token es correcto da un true, sino da un error y retorna false
      localStorage.setItem("token", jwt);
      localStorage.setItem("id_usuario", id_usuario);
      localStorage.setItem("perfil_id", perfil_id);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok =await IniciarSesion();
    
    if (ok) {
      setTimeout(() => {
          Swal.fire({
              icon: "success",
              title: "Bienvenido",
              text: "Inicio de sesion exitoso",
            });
        navigate("/home");
      }, 1000);
    } else {
      navigate("/");
      Swal.fire({
        icon: "error",
        title: "Inicio de sesión fallido",
        text: "Por favor verifique sus datos",
      });
    }

    setValues({
      email: "",
      clave: "",
    });
    navigate("/home");
  };
  //metodo para enviar los datos del formulario

  return (
    <div className="App login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button>Iniciar Sesión</button>
        <Link className="link" to="/register">Registrarse</Link>
      </form>
    </div>
  );
};

export default Login;
