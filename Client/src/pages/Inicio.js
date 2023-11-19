import styles from "./Inicio.module.css";

const Inicio = () => {
  return (
    <div className={styles.inicio}>
      <div className={styles.vectorParent}>
        <img className={styles.groupChild} alt="" src="/rectangle-13.svg" />
        <b className={styles.cerrarSesion}>Cerrar Sesion</b>
        <img className={styles.image8Icon} alt="" src="/image-8@2x.png" />
      </div>
      <div className={styles.rectangleParent}>
        <div className={styles.groupItem} />
        <div className={styles.groupInner} />
        <div className={styles.rectangleDiv} />
        <img className={styles.rectangleIcon} alt="" src="/rectangle-12.svg" />
        <b className={styles.excel}>Excel</b>
        <img className={styles.groupChild1} alt="" src="/rectangle-121.svg" />
        <b className={styles.cruds}>Cruds</b>
        <b className={styles.listadoHorarios}>Listado Horarios</b>
        <b className={styles.solicitudes}>Solicitudes</b>
        <img className={styles.image6Icon} alt="" src="/image-6@2x.png" />
        <img className={styles.image7Icon} alt="" src="/image-7@2x.png" />
        <img className={styles.image22Icon} alt="" src="/image-22@2x.png" />
        <img className={styles.image10Icon} alt="" src="/image-10@2x.png" />
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.groupChild2} />
        <div className={styles.notificaciones}>Notificaciones</div>
        <div className={styles.inicio1}>Inicio</div>
        <img className={styles.image9Icon} alt="" src="/image-9@2x.png" />
        <div className={styles.lineDiv} />
        <div className={styles.groupChild3} />
        <img className={styles.image16Icon} alt="" src="/image-16@2x.png" />
      </div>
      <div className={styles.vectorGroup}>
        <img className={styles.groupChild4} alt="" src="/rectangle-4.svg" />
        <img className={styles.groupChild5} alt="" src="/rectangle-161.svg" />
        <b className={styles.bienvenidoAdministrador}>
          Bienvenido: Administrador
        </b>
        <img
          className={styles.avatarImage60}
          alt=""
          src="/avatar--image60@2x.png"
        />
      </div>
    </div>
  );
};

export default Inicio;
