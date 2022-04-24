import "./App.css";
import Home from "./pages/home/Home";
import Blank from "./pages/blank/Blank";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Odontologo from "./pages/odontologo/Odontologo";
import Paciente from "./pages/paciente/Paciente";
import Turno from "./pages/turno/Turno";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
            
          <Route index element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="home" element={<Home />} />
          <Route path="turnos" element={<Turno title="Turnos" />} />
          <Route path="perfil" element={<Blank title="Perfil" />} />

          <Route path="pacientes">
            <Route index element={<Paciente title="Pacientes" />} />
            <Route path=":id" element={<Paciente title="Pacientes id" />} />
            <Route path="new" element={<Paciente title="pacientes new" />} />
          </Route>

          <Route path="odontologos">
            <Route index element={<Odontologo title="Odontologos" />} />
            <Route path=":id" element={<Odontologo title="Odontologos id" />} />
            <Route path="new" element={<Odontologo title="Odontologos new" />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
