import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "tailwindcss/tailwind.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GlobalProvider } from "./context/globalContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalProvider>
      {/* <GoogleOAuthProvider clientId="782580239051-kdpo57lh6n8d5pq8gh64uimvo82o1bsh.apps.googleusercontent.com"> */}
      <App />
      {/* </GoogleOAuthProvider> */}
    </GlobalProvider>
  </Provider>
);
reportWebVitals();
