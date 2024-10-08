import { useForm } from "react-hook-form";
import axios from "axios";
import { base_url } from "../../utils/utilities";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${base_url}/email`, data);
  
      if (response.status === 200) {
        
        alert('¡Correo electrónico enviado con éxito!');
      } else {
       
        alert('Error al enviar el correo electrónico. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
     
      alert('Error al enviar el correo electrónico. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="m-10 py-10">
      <h2 className="text-3xl text-customOrange font-bold mb-4">
        AQUI PUEDES CONTACTARNOS
      </h2>
      <h3 className="text-sm mb-4">
        Coloca tus datos y qué preguntas quieres hacernos
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="grid grid-cols-1 auto-rows-fr grid-flow-row gap-4">
          {errors.firstName && <span>Este campo es obligatorio</span>}
          <input
            placeholder="Nombre"
            {...register("firstName", { required: true })}
            className="border border-customOrange rounded-md"
          />
          {errors.lastName && <span>Este campo es obligatorio</span>}
          <input
            placeholder="Apellido"
            {...register("lastName", { required: true })}
            className="border border-customOrange rounded-md"
          />
          {errors.interest && <span>Selecciona una opción</span>}
          <select {...register("interest", { required: true })} className="border border-customOrange rounded-md" style={{ color: "black" }}>
            <option value="">En qué estás interesado</option>
            <option value="rutinaPersonalizada">Rutina personalizada en tu casa</option>
            <option value="entrenamientoPresencial">Entrenamiento presencial</option>
            <option value="indumentaria">Indumentaria</option>
          </select>

          {errors.email && <span>Ingresa un correo electrónico válido</span>}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="border border-customOrange rounded-md"
          />
          <textarea
            placeholder="Mensaje"
            {...register("message")}
            className="border border-customOrange rounded-md"
          />
        </div>
        <button type="submit" className="bg-customOrange py-2 px-4 rounded-md mt-4">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
