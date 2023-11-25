import { useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./SingleUser.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { FcFullTrash } from "react-icons/fc";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { deleteUser, getUser } from "../../../features/user/userSlice";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";
import { MdOutlinePerson2 } from "react-icons/md";

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state, "state");
  const { user, message } = state.users;
  const { id } = useParams();
  const userId = id;
  console.log(id, user, "-------------------------------------------");
  const handleDelete = (userName, userId) => {
    Swal.fire({
      color: "gray",
      icon: "warning",
      iconColor: "white",
      background: "#1f1f1f",
      buttonsStyling: false,
      title: `<p>Wow wow!</p>`,
      html: `
      <p>
        Seguro quieres eliminar este usuario <b>${userName}</b>?
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

  useEffect(() => {
    console.log(user, "userlfkasdnofjbasndfobasdeu");
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [userId, dispatch]);

  console.log(user, "useasdasdasdadsar");
  const dataSource = [
    {
      key: 1,
      firstName: user?.name,
      lastName: user?.lastname,
      email: user.Credentials ? user.Credentials[0].email : null,
      status: (
        <div className="userStatusSpan ">
          <span className={`${user?.logged ? "online" : "offline"}`}></span>
          {user?.logged ? "Online" : "Offline"}
        </div>
      ),
      actions: (
        <div className="flex align-middle gap-3">
          <FcFullTrash
            size={19}
            className="userDelete"
            onClick={() => handleDelete(user?.name, user?.idUser)}
          />
          {message === `ban updating ${user?.id}` ? (
            <TailSpin
              height="20"
              width="20"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            user?.disabled
          )}
        </div>
      ),

      grupo: <div className="text-center"></div>,
    },
  ];

  return (
    <div
      className={`${styles.wrapper} bg-gray-300 p-6 rounded-lg shadow-lg userDetails`}
    >
      <div className={styles.title}>
        <div
          className={`${styles.goBack} my-4`}
          onClick={() => navigate("/coach")}
        >
          <div className="ml-5 text-4xl font-bold font-barlow-regular flex gap-4">
            <MdOutlinePerson2 className="bg-gray-500 rounded-full h-15 w-15" />
            <h3 className="text-black text-center"> Perfil de {user?.name}</h3>
          </div>
        </div>
      </div>
      <div className="w-full">
        {dataSource.map((item) => (
          <div
            key={item.key}
            className={
              styles.customDiv + " bg-gray-200 p-4 rounded-lg shadow mb-4 ml-5"
            }
          >
            <div className="mb-2 w-fit flex gap-5">
              <h3 className=" text-left text-3xl text-green-900">Nombre:</h3>
              <b className="text-black text-left text-3xl font-bold">
                {item.firstName}
              </b>
            </div>
            <div className="mb-2 w-fit flex gap-5">
              <h3 className=" text-left text-3xl text-green-900 ">Apellido:</h3>
              <b className="text-black text-left text-3xl font-bold">
                {item.lastName}
              </b>
            </div>
            <div className="mb-2 w-fit flex gap-5">
              <h3 className=" text-left text-3xl text-green-900">Email:</h3>
              <b className="text-black text-left text-3xl font-bold">
                {item.email}
              </b>
            </div>
            <div className="mb-2 w-fit flex gap-5">
              <h3 className="text-left text-3xl text-green-900">Grupo:</h3>
              <b className="text-black text-left text-3xl font-bold">
                2{item.group}
              </b>
            </div>
            <div className="mb-2 w-fit flex gap-5">
              <h3 className="text-left text-3xl text-green-900">Status:</h3>
              <b className="text-black text-left text-3xl font-bold">
                {item.status}
              </b>
            </div>
            <div className="mb-2 w-fit flex gap-5">
              <h3 className="text-left text-3xl text-green-900">Eliminar:</h3>
              <b className="text-black text-left text-3xl font-bold mt-2 cursor-pointer ">
                {item.actions}
              </b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
