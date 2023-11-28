import { useEffect } from "react";
import styles from "./SingleUser.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FcFullTrash, FcApproval, FcCancel } from "react-icons/fc";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../../../features/user/userSlice";
import { TailSpin } from "react-loader-spinner";
import UserCalendar from "./UserCalendar";

const SingleUser = () => {
  // CONTEXT API

  const userId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const state = useSelector((state) => state);
  // const { user, message } = state.users;
  const location = useLocation();
  const userState = location.state;
  const handleUpdateUser = (info, userId) => {
    if (info === "activate") {
      dispatch(
        updateUser({
          userId: userId,
          data: {
            disabled: false,
          },
          action: `ban updating ${userId}`,
        })
      );
    } else if (info === "disable") {
      dispatch(
        updateUser({
          userId: userId,
          data: {
            disabled: true,
          },
          action: `ban updating ${userId}`,
        })
      );
    } else if (info === "admin") {
      dispatch(
        updateUser({
          userId: userId,
          data: {
            admin: true,
          },
          action: `admin updating ${userId}`,
        })
      );
    } else if (info === "noAdmin") {
      dispatch(
        updateUser({
          userId: userId,
          data: {
            admin: false,
          },
          action: `admin updating ${userId}`,
        })
      );
    }
  };

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

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },

    {
      title: "Rutina",
      dataIndex: "rutina",
      key: "rutina",
    },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, []);
  const user = {
    key: 1,
    userName: userState.userName,
    firstName: userState.firstName,
    lastName: userState.lastName,
    email: userState.email,
    logged: userState.logged,
    disabled: userState.disabled,
  };
  const message = "";
  const dataSource = [
    {
      key: 1,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: (
        <div className="userStatusSpan">
          <span className={`${user.logged ? "online" : "offline"}`}></span>
          {user.logged ? "Online" : "Offline"}
        </div>
      ),
      actions: (
        <div className="flex align-middle  gap-3">
          <FcFullTrash
            size={19}
            className="userDelete"
            onClick={() => handleDelete(user.userName, user.id)}
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
          ) : user.disabled ? (
            <FcApproval
              data-activate={user.id}
              onClick={() => handleUpdateUser("activate", user.id)}
              size={19}
              className="userActivate"
            />
          ) : (
            <FcCancel
              data-disable={user.id}
              onClick={() => handleUpdateUser("disable", user.id)}
              size={19}
              className="userBan"
            />
          )}
        </div>
      ),

      rutina: (
        <div className="text-center">
          <button className="border-spacing-20 bg-customOrange ">Rutina</button>
        </div>
      ),
    },
  ];

  return (
    <div className={`${styles.wrapper} userDetails`}>
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
            <h3>{userState.firstName} Info</h3>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={`${styles.right} w-full`}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
        <div className="w-full">
          <UserCalendar userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
