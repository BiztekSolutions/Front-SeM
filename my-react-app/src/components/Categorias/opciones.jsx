import Typewriter from "typewriter-effect";

function Opciones() {
  return (
    <div style={{ fontSize: "32px", paddingTop: "20px" }}>
      <Typewriter
        options={{
          strings: ["FUERZA", "CARDIO", "PILATES", "YOGA"],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}

export default Opciones;
