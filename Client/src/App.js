import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Form from "./pages/Form";
import Filtros from "./pages/Filtros";
import ProfeCrud from "./pages/ProfeCrud";
import AlumnoCrud from "./pages/AlumnoCrud";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Admin from './components/Admin';
import Profesor from "./pages/Profesor";
import Alumno from "./pages/Alumno";

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
      case "/Filtros":
          title = "";
          metaDescription = "";
          break;
      case "/ProfeCrud":
            title = "";
            metaDescription = "";
            break;
      case "/AlumnoCrud":
            title = "";
            metaDescription = "";
            break;
      case "/Admin":
            title = "";
            metaDescription = "";
            break;
      case "/Profesor":
            title = "";
            metaDescription = "";
            break;
      case "/Alumno":
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
      <Route path="/Filtros" element={<Filtros />} />
      <Route path="/ProfeCrud" element={<ProfeCrud />} />
      <Route path="/AlumnoCrud" element={<AlumnoCrud />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:userType/:id/:token" element={<ResetPassword />} />
      <Route path="/Admin" element={<Admin/>} />
      <Route path="/Profesor/:idProfesor/:nombreProfesor" element={<Profesor />} />
      <Route path="/Alumno/:idAlumno/:nombre" element={<Alumno />} />

    </Routes>
  );
}
export default App;
