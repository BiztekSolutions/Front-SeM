import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'tailwindcss/tailwind.css';
import reportWebVitals from "./reportWebVitals";
// import { GlobalProvider } from "./context/globalContext";
// import { Provider } from "react-redux";
// import { store } from "./store/store";

// import { LanguageProvider } from "./context/languageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  //   <GlobalProvider>
  //     <LanguageProvider>
       <App />
  //     </LanguageProvider>
  //   </GlobalProvider>
  // </Provider>
);
reportWebVitals();
