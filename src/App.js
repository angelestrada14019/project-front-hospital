import "./App.css";
import Home from "./pages/home/Home";
import Blank from "./pages/blank/Blank";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
            
          <Route index element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="home" element={<Home />} />
          <Route path="turnos" element={<Blank title="turnos" />} />
          <Route path="perfil" element={<Blank title="perfil" />} />

          <Route path="pacientes">
            <Route index element={<Blank title="pacientes" />} />
            <Route path=":id" element={<Blank title="pacientes id" />} />
            <Route path="new" element={<Blank title="pacientes new" />} />
          </Route>

          <Route path="odontologos">
            <Route index element={<Blank title="odontologos" />} />
            <Route path=":id" element={<Blank title="odontologos id" />} />
            <Route path="new" element={<Blank title="odontologos new" />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
