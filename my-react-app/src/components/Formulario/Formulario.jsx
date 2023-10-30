import Form from "./Form";

function Formulario() {
  return (
    <div className="flex mb-20">
      <div className="flex-1">
        <Form />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img
          src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/img/imgDerecha3.webp"
          alt="tercerImagen"
          className="w-72"
        />
      </div>
    </div>
  );
}

export default Formulario;
