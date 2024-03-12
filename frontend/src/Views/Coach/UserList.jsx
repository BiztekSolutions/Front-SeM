import {
  deleteUser,
  getUsers,
  addUserToClients,
  getClients,
 
} from "../../features/user/userSlice";
import { BiCheck } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import ListaUsuarios from "./ListaUsuarios";
import { TiPlus } from "react-icons/ti";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import { showSuccessNotification } from "../../features/layout/layoutSlice";

function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, clients, isLoading, message } = useSelector(
    (state) => state.users
  );
  

  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    if (!users) {
      dispatch(getUsers(user.token));
    }
    if (!clients) {
      dispatch(getClients(user.token));
    }
  }, [users, clients]);

  if (isLoading) {
     <LoadingSpinner />;
  }
  const handleCreateClient = (userId) => {
    dispatch(addUserToClients(userId, user.token));
    setTimeout(() => {
      dispatch(getClients(user.token));
      navigate("../listaDeClientes");
    }, 1000);
  };
  
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  }


  useEffect(() => {

    if (message === "User deleted successfully") {
      dispatch(showSuccessNotification("Usuario eliminado exitosamente"));
      dispatch(getUsers(user.token));
    }
  }, [message]);
  
  const isUserInClient = (userId) => {
    return clients.some((client) => client.idUser === userId);
  };

  const filteredUsers = users?.filter((u) => u.idUser !== user.user);
  const dataSource = filteredUsers?.map((user, i) => ({
        key: i,
        firstName: user.name,
        lastName: user.lastname,
        email: user.Credentials[0].email,
        actions: (
          <div className="flex align-items-center gap-3">
            {isUserInClient(user.idUser) ? (
              <BiCheck size={19} className="userAdded h-9 w-9" />
            ) : (
              <TiPlus
                size={19}
                className="userAdd h-9 w-9"
                onClick={() => handleCreateClient(user.idUser)}
              />
            )}

            <DeleteButton userName={user.name} userId={user.idUser} onClick={()=>handleDeleteUser(user.userId)}/>
          </div>
        ),
      }));
    
  

  return (
    <div>
      <ListaUsuarios dataSource={dataSource} />
    </div>
  );
}

export default UserList;
