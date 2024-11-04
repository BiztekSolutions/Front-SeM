//LOCALHOST DEV URL
const dev_url = "http://localhost:3000/api/v1";
//DEPLOYED URL
const prod_url = "https://salud-en-movimiento.com.ar/api/v1";

// Determina la URL base en función del entorno
export const base_url = import.meta.env.VITE_ENV === 'development' ? dev_url : prod_url;
// export const base_url = "https://sems-backend.herokuapp.com/api/v1";
