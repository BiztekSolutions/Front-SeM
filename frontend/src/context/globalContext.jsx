import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
export const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {

  const refPrivacyPolicy = useRef();
  const refRefundPolicy = useRef();
  const refShippingPolicy = useRef();
  const refTermsCond = useRef();
  const refFAQS = useRef();
  const refFAQS1 = useRef();
  const refFAQS2 = useRef();
  const refFAQS3 = useRef();
  const refFAQS4 = useRef();
  const refFAQS5 = useRef();
  // MODALS LOGIN, CART
  const [showLoginModal, setShowLoginModal] = useState(false);

  // LOGIN & LANGUAGE
  const [logged, setLogged] = useState(false);

  const data = {
    logged,
    setLogged,
    showLoginModal,
    setShowLoginModal,
    refFAQS,
    refPrivacyPolicy,
    refRefundPolicy,
    refShippingPolicy,
    refTermsCond,
    refFAQS1,
    refFAQS2,
    refFAQS3,
    refFAQS4,
    refFAQS5,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
