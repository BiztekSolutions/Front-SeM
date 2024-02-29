import { useForm } from "react-hook-form";
import axios from "axios";
function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/email', data);
  
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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto py-20">
      <h2 className="text-3xl text-customOrange font-bold mb-4">
        AQUI PUEDES CONTACTARNOS
      </h2>
      <h3 className="text-sm mb-4">
        Coloca tus datos y qué preguntas quieres hacernos
      </h3>
      {errors.firstName && <span style={{ color: "black" }}>Este campo es obligatorio</span>}
      <input
        type="text"
        placeholder="Nombre"
        {...register("firstName", { required: true })}
        className="w-1/2 px-3 py-2 mb-4 border border-gray-300 rounded-md"
        style={{ color: "black" }}
      />
      {errors.lastName && <span style={{ color: "black" }}>Este campo es obligatorio</span>}
      <input
        type="text"
        placeholder="Apellido"
        {...register("lastName", { required: true })}
        className="w-1/2 px-3 py-2 mb-4 border border-gray-300 rounded-md"
        style={{ color: "black" }}
      />
      {errors.interest && <span style={{ color: "black" }}>Selecciona una opción</span>}
      <select
        {...register("interest", { required: true })}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        style={{ color: "black" }}
      >
        <option value="">En qué estás interesado</option>
        <option value="rutinaPersonalizada">
          Rutina personalizada en tu casa
        </option>
        <option value="entrenamientoPresencial">
          Entrenamiento presencial
        </option>
        <option value="indumentaria">Indumentaria</option>
      </select>
      {errors.email && <span style={{ color: "black" }}>Ingresa un correo electrónico válido</span>}
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        style={{ color: "black" }}
      />
      <textarea
        placeholder="Mensaje"
        {...register("message")}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        style={{ color: "black" }}
      />
      <button type="submit" className="bg-blue-500  py-2 px-4 rounded-md">
        Enviar
      </button>
    </form>
  );
}

export default ContactForm;
