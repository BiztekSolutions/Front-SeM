import {
  deleteUser,
  getUsers,
  addUserToClients,
} from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FcFullTrash, FcInfo } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import ListaUsuarios from "./ListaUsuarios";
import { TiPlus } from "react-icons/ti";
function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users } = state.users;
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDelete = (userName, userId) => {
    //@TODO: Reemplazar el Swal
    // Swal.fire({
    //   color: "whitesmoke",
    //   icon: "warning",
    //   iconColor: "white",
    //   background: "#1f1f1f",
    //   buttonsStyling: false,
    //   title: `<p>Wow wow!</p>`,
    //   html: `
    //   <p>
    //     Are you sure you want to delete the user <b>${userName}</b>?
    //   </p>
    //   `,
    //   showConfirmButton: true,
    //   confirmButtonText: "Yes",
    //   confirmButtonColor: "#1f1f1f",
    //   showDenyButton: true,
    //   denyButtonText: "No",
    //   denyButtonColor: "grey",
    //   denyButtonAriaLabel: "black",
    //   toast: true,
    //   customClass: {
    //     confirmButton: "confirmSwalCheckout",
    //     denyButton: "denySwalCheckout",
    //     title: "swalTitle",
    //     htmlContainer: "swalHtml",
    //   },
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     dispatch(deleteUser(userId));
    //   } else if (result.isDenied) {
    //     return;
    //   }
    // });
  };

  const handleCreateClient = (userId) => {
    dispatch(addUserToClients(userId));
    setTimeout(() => {
      navigate("../listaDeClientes");
    }, 3000);
  };

  const dataSource = [];
  if (users?.length > 0) {
    for (let i = 0; i < users.length; i++) {
      dataSource.push({
        key: i,
        firstName: users[i].name,
        lastName: users[i].lastname,
        email: users[i].Credentials[0].email,
        actions: (
          <div className="flex align-items-center gap-3">
            <TiPlus
              size={19}
              className="userAdd h-9 w-9"
              onClick={() => handleCreateClient(users[i].idUser)}
            />

            <FcFullTrash
              size={19}
              className="userDelete h-9 w-9"
              onClick={() => handleDelete(users[i].userName, users[i].id)}
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

export default UserList;
