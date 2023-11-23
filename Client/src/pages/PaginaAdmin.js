import React from 'react';
import { Link } from 'react-router-dom';
import './estilos.css';
import ProfeCrud from './ProfeCrud';
import Filtros from './Filtros';
import csv from './csv.png'
import calendario from './calendario.png'
import agregar_contacto from './agregar_contacto.png'
import conversacion from './conversacion.png'


/* <Filtros />*/

function Admins() {
return (
<div className="parent">
<div className="div1">1</div>
<div className="div2"><button className="buttonInicio">
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
  Volver Inicio
</button> <button className="buttonInicio">
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
  Notificaciones
</button> </div>
<div className="div3"><button className="BtnCerrarS">
  
  <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div className="textCerrarS">Cerrar Sesion</div>
</button> </div>
<div className="div4">4</div>
<div className="div5">5 </div>
<div className="div6"><button id="btn-message" className="button-message">
	<div className="content-avatar">
		<div className="status-user"></div>
		<div className="avatar">
			<svg className="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
		</div>
	</div>
	<div className="notice-content">
		<div className="username">Mario Ortiz</div>
		<div className="lable-message">Administrador<span className="number-message"></span></div>
		<div className="user-id"></div>
	</div>
</button></div>
<Link to="/ProfeCrud" className="div7">
        
      </Link>
      <Link to="/Filtros" className="div8">
        8
      </Link>
      <Link to="/csv" className="div9">
        9
      </Link>
      <Link to="/ruta-del-div-10" className="div10"> 
        10
      </Link>
<div className="div11">Cruds</div>
<div className="div12">Listado Horarios </div>
<div className="div13">importar/exportar CSV </div>
<div className="div14">Solicitudes </div>
<div className="div15"><img src={csv}  alt="csv" className='imagencsv' /></div>
<div className="div16"><img src={conversacion}  alt="conversacion" className='imagencsv' /></div>
<div className="div17"><img src={calendario}  alt="calendario" className='imagencsv' /> </div>
<div className="div18"><img src={agregar_contacto}  alt="agregar_contacto" className='imagencsv' /> </div>
<div className="div19">19 Notificaciones</div>
</div>
  );
}

export default Admins;