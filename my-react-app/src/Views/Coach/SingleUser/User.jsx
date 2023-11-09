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

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { user, message } = state.users;
  const { id } = useParams();
  const userId = id;

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

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
    {
      title: "Grupo",
      dataIndex: "grupo",
      key: "grupo",
    },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, []);

  const dataSource = [
    {
      key: 1,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: (
        <div className="userStatusSpan ">
          <span className={`${user.logged ? "online" : "offline"}`}></span>
          {user.logged ? "Online" : "Offline"}
        </div>
      ),
      actions: (
        <div className="flex align-middle gap-3">
          <FcFullTrash
            size={19}
            className="userDelete"
            onClick={() => handleDelete(user.firstName, user.id)}
          />
          {message === `ban updating ${user.id}` ? (
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
            user.disabled
          )}
        </div>
      ),

      grupo: <div className="text-center"></div>,
    },
  ];

  return (
    <div className={`${styles.wrapper} userDetails bg-gray-500`}>
      {/* <UserFavsModal />
      <UserCartModal /> */}
      <div className={styles.title}>
        <div
          className={`${styles.goBack} my-4`}
          onClick={() => navigate("/coach")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <div className="ml-5">
            <h3>{user.firstName} Info</h3>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={`${styles.right} w-full`}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  );
}
