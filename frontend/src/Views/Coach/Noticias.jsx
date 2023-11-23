function Noticias() {
  const user = {
    id: "2f493bd206af6d447b34510213e79cd02c8551aa6ed9122a22bce31f86580d71",
    firstName: "asdo",
    lastName: "Chasdene",
    email: "asdasdsasda@hotmail.com",
    entrenador: true,
  };

  const jsonString = JSON.stringify(user);
  const sizeInBytes = new TextEncoder().encode(jsonString).length;

  console.log("Tamaño en bytes:", sizeInBytes);

  return <div></div>;
}

export default Noticias;
