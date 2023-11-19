import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import InicioConVentanaDeNotifica from "./pages/InicioConVentanaDeNotifica";
import Cruds from "./pages/Cruds";
import InicioAdmin from "./pages/Inicio";
import Solicitudes from "./pages/Solicitudes";
import Form from "./pages/Form";
import Filtros from "./pages/Filtros";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/cruds":
        title = "";
        metaDescription = "";
        break;
      case "/InicioConVentanaDeNotifica":
        title = "";
        metaDescription = "";
        break;
      case "/solicitudes":
        title = "";
        metaDescription = "";
        break;
      case "/InicioAdmin":
          title = "";
          metaDescription = "";
          break;
      case "/Filtros":
          title = "";
          metaDescription = "";
          break;

    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/cruds" element={<Cruds />} />
      <Route path="/InicioConVentanaDeNotifica" element={<InicioConVentanaDeNotifica />} />
      <Route path="/solicitudes" element={<Solicitudes />} />
      <Route path="/InicioAdmin" element={<InicioAdmin />} />
      <Route path="/Filtros" element={<Filtros />} />
    </Routes>
  );
}
export default App;
