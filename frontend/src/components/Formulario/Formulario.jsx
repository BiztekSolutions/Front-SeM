import Form from "./Form";
import styles from "./Form.module.css";
import img3 from "../../assets/img3.jpg";

function Formulario() {
  return (
    <div className={`flex mb-16 ${styles.todo}`}>
      <div className={`flex-1 ${styles.form}`}>
        <Form />
      </div>
      <div className={`${styles.img3} flex-1 flex items-center justify-center`}>
        <img
          src={img3}
          alt="tercerImagen"
          style={{ backgroundColor: 'transparent'}}
        />
      </div>
    </div>
  );
}

export default Formulario;
