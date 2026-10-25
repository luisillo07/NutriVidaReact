import Inicio from "./pages/inicio.jsx";
import Nutricionistas from "./pages/nutricionistas.jsx";
import Login from "./pages/login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoEncontrada from "./pages/no_encontrada.jsx";
import Nosotros from "./pages/nosotros.jsx";
import Servicios from "./pages/servicios.jsx";
import Contacto from "./pages/contacto.jsx";
import MisCitas from "./pages/mis_citas.jsx";
import GestionCitas from "./pages/gestion_citas.jsx";
import {useState} from "react";
import AgendarCita from "./pages/agendar_cita.jsx";

function App() {

    const [usuarioActual, setUsuarioActual] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nutricionistas" element={<Nutricionistas />} />
                <Route path="/login" element={ <Login usuarioActual={usuarioActual} onIngresar={setUsuarioActual}/>}/>
                <Route path="/agendar" element={<AgendarCita />} />
                <Route path="/mis-citas" element={usuarioActual?.rol === "paciente" ? <MisCitas />: <Navigate to="/login" replace />}/>
                <Route path="/gestion-citas" element={usuarioActual?.rol === "secretaria" ? <GestionCitas /> : <Navigate to="/login" replace />}/>
                <Route path="*" element={<NoEncontrada />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
