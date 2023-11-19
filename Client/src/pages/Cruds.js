import styles from "./Cruds.module.css";

const Cruds = () => {
  return (
    <div className={styles.cruds}>
      <div className={styles.vectorParent}>
        <img className={styles.groupChild} alt="" src="/rectangle-13.svg" />
        <b className={styles.cerrarSesion}>Cerrar Sesion</b>
        <img className={styles.image8Icon} alt="" src="/image-8@2x.png" />
      </div>
      <div className={styles.rectangleParent}>
        <div className={styles.groupItem} />
        <div className={styles.notificaciones}>Notificaciones</div>
        <div className={styles.inicio}>Inicio</div>
        <img className={styles.image9Icon} alt="" src="/image-9@2x.png" />
        <div className={styles.groupInner} />
        <div className={styles.lineDiv} />
        <img className={styles.image16Icon} alt="" src="/image-16@2x.png" />
      </div>
      <div className={styles.vectorGroup}>
        <img className={styles.rectangleIcon} alt="" src="/rectangle-4.svg" />
        <img className={styles.groupChild1} alt="" src="/rectangle-161.svg" />
        <b className={styles.bienvenidoAdministrador}>
          Bienvenido: Administrador
        </b>
        <img
          className={styles.avatarImage60}
          alt=""
          src="/avatar--image60@2x.png"
        />
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.rectangleDiv} />
        <img className={styles.groupChild2} alt="" src="/rectangle-17.svg" />
        <div className={styles.cruds1}>Cruds</div>
        <div className={styles.groupChild3} />
        <b className={styles.profesor}>Profesor</b>
        <div className={styles.groupChild4} />
        <b className={styles.alumnos}>Alumnos</b>
        <div className={styles.groupChild5} />
        <b className={styles.carrera}>Carrera</b>
        <div className={styles.groupChild6} />
        <b className={styles.horarios}>Horarios</b>
        <div className={styles.groupChild7} />
        <b className={styles.asignatura}>Asignatura</b>
        <img className={styles.image17Icon} alt="" src="/image-17@2x.png" />
        <img className={styles.image18Icon} alt="" src="/image-18@2x.png" />
        <img className={styles.image19Icon} alt="" src="/image-19@2x.png" />
        <img className={styles.image20Icon} alt="" src="/image-20@2x.png" />
        <img className={styles.image21Icon} alt="" src="/image-211@2x.png" />
      </div>
    </div>
  );
};

export default Cruds;
