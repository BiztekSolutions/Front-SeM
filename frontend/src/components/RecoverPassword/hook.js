import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/utilities";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../features/layout/layoutSlice";
// Puedes definir tus endpoints aquí
const API_URL_RECOVER_PASSWORD = "/users/recover-password";
const API_URL_RESET_PASSWORD = "/users/update-password";

export const usePasswordRecovery = () => {
  const [loading, setLoading] = useState({
    recovering: false,
    resetting: false,
  });
  const [success, setSuccess] = useState({
    recovering: false,
    resetting: false,
  });

  const resetState = () => {
    setSuccess({
      recovering: false,
      resetting: false,
    });
  };

  const recoverPassword = async (email) => {
    setLoading({
      ...loading,
      recovering: true,
    });
    try {
      const response = await axios.post(base_url + API_URL_RECOVER_PASSWORD, {
        email,
      });
      console.log(response.status, response.data.message);
      
      if (response.status == 200) {
        setSuccess({
          ...success,
          recovering: true,
        });
      }
      return response;
    } catch (error) {
      console.log(error);

      setSuccess({
        ...success,
        recovering: false,
      });
    }
    setLoading({
      ...loading,
      recovering: false,
    });
  };

  const resetPassword = async (newPassword, token, callback) => {
    setLoading({
      ...loading,
      resetting: true,
    });
    try {
      console.log("resetPassword", newPassword, token);
      
      await axios.post(
        base_url + API_URL_RESET_PASSWORD,
        {
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess({
        ...success,
        resetting: true,
      });
      if (callback) callback();
    } catch (error) {
      console.log(error);

      setSuccess({
        ...success,
        resetting: false,
      });
    }
    setLoading({
      ...loading,
      resetting: false,
    });
  };

  return {
    recoverPassword,
    resetPassword,
    success,
    loading,
    resetState,
  };
};
