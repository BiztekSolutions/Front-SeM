import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FcFullTrash } from "react-icons/fc";
import { MdOutlinePerson2 } from "react-icons/md";
import { Typography } from "antd";
import { deleteUser, getUser } from "../../../features/user/userSlice";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";

import styles from "./SingleUser.module.css";

export default function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { id } = useParams();
  const userId = id;

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, []);

  const handleDelete = (userName, userId) => {};

  return (
    <div>
      {!user.Credentials ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`${styles.wrapper} p-6 rounded-lg shadow-lg userDetails`}
        >
          <div className={styles.title}>
            <div className="ml-5 text-4xl font-bold font-barlow-regular flex gap-4">
              <MdOutlinePerson2 className="rounded-full h-15 w-15" />
              <Typography.Title level={3} className="text-center">
                Perfil de {user.name}
              </Typography.Title>
            </div>
          </div>
          <div className="w-full">
            <div
              key={1}
              className={styles.customDiv + "p-4 rounded-lg shadow mb-4 ml-5"}
            >
              <div className="mb-2 w-fit flex gap-5">
                <Typography.Title level={3} className="text-left">
                  Nombre:
                </Typography.Title>
                <b className="text-left text-3xl font-bold">{user.name}</b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <Typography.Title level={3} className="text-left ">
                  Apellido:
                </Typography.Title>
                <b className="text-left text-3xl font-bold">{user.lastname}</b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <Typography.Title level={3} className="text-left">
                  Email:
                </Typography.Title>
                <b className="text-left text-3xl font-bold">
                  {user.Credentials[0].email}
                </b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <Typography.Title level={3} className="text-left text-3xl">
                  Grupo:
                </Typography.Title>
                <b className="text-left text-3xl font-bold">Grupo</b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <Typography.Title level={3} className="text-left text-3xl">
                  Status:
                </Typography.Title>
                <b className="text-left text-3xl font-bold">Estatus</b>
              </div>
              <div className="mb-2 w-fit flex gap-5">
                <Typography.Title level={3} className="text-left text-3xl">
                  Eliminar:
                </Typography.Title>
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
}
