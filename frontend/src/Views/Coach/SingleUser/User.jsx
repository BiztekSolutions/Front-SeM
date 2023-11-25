import { useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./SingleUser.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { FcFullTrash } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { deleteUser, getUser } from "../../../features/user/userSlice";
import { TailSpin } from "react-loader-spinner";
import { MdOutlinePerson2 } from "react-icons/md";
import { Typography } from 'antd';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const { id } = useParams();
  const userId = id;
  const handleDelete = (userName, userId) => {};

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, []);

  return (
    <div>
      {!user.Credentials ? (
        <p>Cargando</p>
      ) : (
        <div
          className={`${styles.wrapper} p-6 rounded-lg shadow-lg userDetails`}
        >
          <div className={styles.title}>
            <div
              className={`${styles.goBack} my-4`}
              onClick={() => navigate("/coach")}
            >
              <div className="ml-5 text-4xl font-bold font-barlow-regular flex gap-4">
                <MdOutlinePerson2 className="rounded-full h-15 w-15" />
                <Typography.Title level={3} className="text-center">
                  Perfil de {user.name}
                </Typography.Title>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              key={1}
              className={styles.customDiv + "p-4 rounded-lg shadow mb-4 ml-5"}
            >
              <div className="mb-2 w-fit flex gap-5">
                <h3 className=" text-left text-3xl">Nombre:</h3>
                <b className="text-left text-3xl font-bold">{user.name}</b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <h3 className=" text-left text-3xl ">Apellido:</h3>
                <b className="text-left text-3xl font-bold">{user.lastname}</b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <h3 className=" text-left text-3xl">Email:</h3>
                <b className="text-left text-3xl font-bold">
                  {user.Credentials[0].email}
                </b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <h3 className="text-left text-3xl">Grupo:</h3>
                <b className="text-left text-3xl font-bold">Grupo</b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <h3 className="text-left text-3xl">Status:</h3>
                <b className="text-left text-3xl font-bold">Estatus</b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <h3 className="text-left text-3xl">Eliminar:</h3>
                <b className="text-left text-3xl font-bold mt-2 cursor-pointer ">
                  <FcFullTrash
                    size={20}
                    className="userDelete"
                    onClick={() => handleDelete(user?.name, user?.idUser)}
                  />
                </b>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  // return (
  //   <div>
  //     {!user.Credentials ? (
  //       <p>Cargando</p>
  //     ) : (
  //       <div>
  //         <h1>{user.name}</h1>
  //         <h1>{user.lastname}</h1>
  //         <h1>{user.Credentials[0].email}</h1>
  //       </div>
  //     )}
  //   </div>
  // );
}
