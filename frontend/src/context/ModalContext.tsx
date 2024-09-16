import React, { createContext, useState } from "react";

class VoidContext implements ModalContext {
  get modals(): never {
    throw new Error("Cannot consume context outside of provider");
  }
  get setModal(): never {
    throw new Error("Cannot consume context outside of provider");
  }
  get modalsData(): never {
    throw new Error("Cannot consume context outside of provider");
  }

}

interface Modals {
  forgotPasswordModal: boolean;
  resetPasswordModal: boolean;

}

interface ModalsData {

}

interface ModalContext {
  modals: Modals;
  modalsData: ModalsData;
  setModal: (modal: keyof Modals, visible: boolean) => void;
}

export const ModalContext = createContext<ModalContext>(new VoidContext());

const modalInitialState: Modals = {
  resetPasswordModal: false,
  forgotPasswordModal: false,
};

export const ModalContextProvider: React.FC = ({ children }) => {
  const [modals, setModalFn] = useState<Modals>(modalInitialState);
  const [modalsData, setModalsData] = useState<ModalsData>({
    alertModal: {
      propertyId: undefined,
    },
    consultModal: {
      property: undefined,
      propertiesId: [],
    },
  });

  const setModal = (key: keyof Modals, visible: boolean) => {
    console.log("setModal", key, visible);

    // Mantener el estado de otros modales al actualizar uno
    setModalFn((prevModals) => ({
      ...prevModals, // Mantener el estado anterior
      [key]: visible, // Actualizar solo el modal que queremos cambiar
    }));
  };

  return (
    <ModalContext.Provider
      value={{
        modals,
        setModal,
        modalsData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
