import { deleteUser, getClients } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FcFullTrash, FcInfo } from "react-icons/fc";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ListaUsuarios from "./ListaUsuarios";

function ClientList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { clients } = state.users;
  useEffect(() => {
    dispatch(getClients());
  }, []);

  const handleDelete = (userName, userId) => {
    Swal.fire({
      color: "whitesmoke",
      icon: "warning",
      iconColor: "white",
      background: "#1f1f1f",
      buttonsStyling: false,
      title: `<p>Wow wow!</p>`,
      html: `
      <p>
        Are you sure you want to delete the user <b>${userName}</b>?
      </p>
      `,
      showConfirmButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#1f1f1f",
      showDenyButton: true,
      denyButtonText: "No",
      denyButtonColor: "grey",
      denyButtonAriaLabel: "black",
      toast: true,
      customClass: {
        confirmButton: "confirmSwalCheckout",
        denyButton: "denySwalCheckout",
        title: "swalTitle",
        htmlContainer: "swalHtml",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId));
      } else if (result.isDenied) {
        return;
      }
    });
  };

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
            <FcFullTrash
              size={19}
              className="userDelete h-9 w-9"
              onClick={() => handleDelete(clients[i].userName, clients[i].id)}
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
