import styles from "./InicioConVentanaDeNotifica.module.css";

const InicioConVentanaDeNotifica = () => {
  return (
    <div className={styles.inicioConVentanaDeNotifica}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.notificaciones}>Notificaciones</div>
        <img className={styles.groupItem} alt="" src="/rectangle-16.svg" />
        <img className={styles.image11Icon} alt="" src="/image-11@2x.png" />
        <div className={styles.notificacion1Parent}>
          <div className={styles.notificacion1} />
          <div className={styles.aviso1}>Aviso 1 | Fecha: 17/10</div>
          <img className={styles.image2Icon} alt="" src="/image-2@2x.png" />
          <img className={styles.image14Icon} alt="" src="/image-14@2x.png" />
          <b className={styles.abrir}>Abrir</b>
          <b className={styles.masInformacin}>Mas información</b>
          <div className={styles.descripcionSolicitoElContainer}>
            <b>Descripcion</b>
            <span>{`: Solicito el cambio de horario de mi clase     de quimica `}</span>
          </div>
          <div className={styles.profesorLuisBeazContainer}>
            <b>Profesor:</b>
            <span> Luis Beaz Espinoza</span>
          </div>
          <img className={styles.groupInner} alt="" src="/line-3.svg" />
        </div>
        <div className={styles.notificacion1Group}>
          <div className={styles.notificacion11} />
          <div className={styles.aviso2}>Aviso 2 | Fecha: 16/10</div>
          <img className={styles.image2Icon1} alt="" src="/image-21@2x.png" />
          <img className={styles.image14Icon1} alt="" src="/image-141@2x.png" />
          <b className={styles.abrir1}>Abrir</b>
          <b className={styles.masInformacin1}>Mas información</b>
          <div className={styles.descripcionSolicitoElContainer1}>
            <b>Descripcion</b>
            <span>{`: Solicito el cambio de horario de mi clase     de quimica `}</span>
          </div>
          <div className={styles.profesorLuisBeazContainer1}>
            <b>Profesor:</b>
            <span> Luis Beaz Espinoza</span>
          </div>
          <img className={styles.lineIcon} alt="" src="/line-3.svg" />
          <div className={styles.notificacion1Container}>
            <div className={styles.notificacion1} />
            <div className={styles.aviso1}>Aviso 3 | Fecha: 17/10</div>
            <img className={styles.image2Icon} alt="" src="/image-21@2x.png" />
            <img
              className={styles.image14Icon}
              alt=""
              src="/image-141@2x.png"
            />
            <b className={styles.abrir}>Abrir</b>
            <b className={styles.masInformacin}>Mas información</b>
            <div className={styles.descripcionSolicitoElContainer}>
              <b>Descripcion</b>
              <span>{`: Solicito el cambio de horario de mi clase     de quimica `}</span>
            </div>
            <div className={styles.profesorLuisBeazContainer}>
              <b>Profesor:</b>
              <span> Luis Beaz Espinoza</span>
            </div>
            <img className={styles.groupInner} alt="" src="/line-3.svg" />
          </div>
        </div>
      </div>
      <div className={styles.vectorParent}>
        <img className={styles.rectangleIcon} alt="" src="/rectangle-13.svg" />
        <b className={styles.cerrarSesion}>Cerrar Sesion</b>
        <img className={styles.image8Icon} alt="" src="/image-8@2x.png" />
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.rectangleDiv} />
        <div className={styles.inicio}>Inicio</div>
        <img className={styles.image9Icon} alt="" src="/image-9@2x.png" />
        <div className={styles.lineDiv} />
        <div className={styles.groupChild2} />
        <img className={styles.image16Icon} alt="" src="/image-16@2x.png" />
        <div className={styles.notificaciones1}>Notificaciones</div>
      </div>
      <div className={styles.vectorGroup}>
        <img className={styles.groupChild3} alt="" src="/rectangle-4.svg" />
        <img className={styles.groupChild4} alt="" src="/rectangle-161.svg" />
        <b className={styles.bienvenidoAdministrador}>
          Bienvenido: Administrador
        </b>
        <img
          className={styles.avatarImage60}
          alt=""
          src="/avatar--image60@2x.png"
        />
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.groupChild5} />
        <div className={styles.groupChild6} />
        <div className={styles.groupChild7} />
        <div className={styles.groupChild8} />
        <b className={styles.cruds}>Cruds</b>
        <b className={styles.listadoHorarios}>Listado Horarios</b>
        <b className={styles.solicitudes}>Solicitudes</b>
        <img className={styles.image6Icon} alt="" src="/image-6@2x.png" />
        <img className={styles.image7Icon} alt="" src="/image-7@2x.png" />
        <img className={styles.image10Icon} alt="" src="/image-10@2x.png" />
      </div>
    </div>
  );
};

export default InicioConVentanaDeNotifica;
