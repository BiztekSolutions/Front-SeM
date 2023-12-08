import { deleteUser, getClients } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FcFullTrash, FcInfo } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import ListaUsuarios from "./ListaUsuarios";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
function ClientList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { clients } = state.users;
  useEffect(() => {
    dispatch(getClients());
  }, []);

  const dataSource = [];
  if (clients?.length > 0) {
    for (let i = 0; i < clients.length; i++) {
      dataSource.push({
        key: i,
        firstName: clients[i].name,
        lastName: clients[i].lastname,
        email: clients[i].Credentials[0].email,
        actions: (
          <div className="flex align-items-center gap-3">
            <FcInfo
              size={19}
              className="userInfo h-9 w-9"
              onClick={() => navigate(`../user/${clients[i].idUser}`)}
            />
            <DeleteButton
              userName={clients[i].name}
              userId={clients[i].idUser}
            />
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

export default ClientList;
