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

function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users, clients } = state.users;
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getClients());
  }, []);

  const handleCreateClient = (userId) => {
    dispatch(addUserToClients(userId));
    setTimeout(() => {
      navigate("../listaDeClientes");
    }, 1000);
  };

  const dataSource = [];
  if (users?.length > 0) {
    for (let i = 0; i < users.length; i++) {
      const isUserInClients = clients.some(
        (client) => client.idUser === users[i].idUser
      );
      dataSource.push({
        key: i,
        firstName: users[i].name,
        lastName: users[i].lastname,
        email: users[i].Credentials[0].email,
        actions: (
          <div className="flex align-items-center gap-3">
            {isUserInClients ? (
              <BiCheck size={19} className="userAdded h-9 w-9" />
            ) : (
              <TiPlus
                size={19}
                className="userAdd h-9 w-9"
                onClick={() => handleCreateClient(users[i].idUser)}
              />
            )}

            <DeleteButton userName={users[i].name} userId={users[i].idUser} />
          </div>
        ),
      });
    }
  }
  return (
    <div>
      <ListaUsuarios dataSource={dataSource} />
    </div>
  );
}

export default UserList;
