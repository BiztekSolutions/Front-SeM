import Router from "./router";
import "./App.css";
import "tailwindcss/tailwind.css";
import { useEffect, useContext } from "react";
import { ModalContextProvider } from "./context/ModalContext";    
import { GlobalContext } from "./context/globalContext";
import NotificationCenter from "./shared/components/notification/NotificationCenter";

function App() {
  const context = useContext(GlobalContext);
  const { setLogged } = context;
  useEffect(() => {
    // LOGIN PERSISTANCE
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (getUserFromLocalStorage) {
      setLogged(getUserFromLocalStorage);
    }
  });
  return (
    <div>
      <NotificationCenter>
        <ModalContextProvider>
          <Router />
        </ModalContextProvider>
      </NotificationCenter>
    </div>
  );
}

export default App;
