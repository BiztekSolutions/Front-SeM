import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../../features/user/userSlice";

function ChangePassword() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Asegúrate de ajustar esto según la estructura de tu estado
  const { user, isLoading } = state;

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la actualización del usuario
    dispatch(
      updateUser({
        userId: id,
        oldPassword: oldPassword,
        newUser: {
          // Incluye cualquier otro dato que desees actualizar en el usuario
          password: newPassword,
        },
      })
    );
  };
  const handleSendResetEmail = () => {
    console.log("send reset email");
  };
  return (
    <div>
      <h2>Change Password</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Old Password:
            <input
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
          </label>
          <br />
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </label>
          <br />
          <button type="submit">Change Password</button>
          <button type="button" onClick={handleSendResetEmail}>
            Send Reset Email
          </button>
        </form>
      )}
    </div>
  );
}

export default ChangePassword;
