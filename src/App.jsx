import Inicio from "./pages/inicio.jsx";
import Nutricionistas from "./pages/nutricionistas.jsx";
import Login from "./pages/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoEncontrada from "./pages/no_encontrada.jsx";
import Nosotros from "./pages/nosotros.jsx";
import Servicios from "./pages/servicios.jsx";
import Contacto from "./pages/contacto.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nutricionistas" element={<Nutricionistas />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NoEncontrada />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
