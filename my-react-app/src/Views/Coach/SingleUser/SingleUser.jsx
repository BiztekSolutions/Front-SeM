import { useContext, useEffect, useState } from "react";
import styles from "./SingleUser.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  FcFullTrash,
  FcApproval,
  FcCancel,
  FcLock,
  FcUnlock,
  FcLike,
  FcCurrencyExchange,
  FcGoogle,
} from "react-icons/fc";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../../../features/user/userSlice";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";

import { GlobalContext } from "../../../context/globalContext";

const SingleUser = () => {
  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setShowUserFavsModal, setShowUserCartModal } = globalContext;

  const userId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { user, message } = state.users;

  const [showPassword, setShowPassword] = useState(false);

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
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
    },
    {
      title: "Social User",
      dataIndex: "socialUser",
      key: "socialUser",
    },
    {
      title: "Wishlist",
      dataIndex: "wishList",
      key: "wishList",
    },
    {
      title: "Cart",
      dataIndex: "cart",
      key: "cart",
    },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, []);

  useEffect(() => {
    if (message === "Delete User Success") {
      navigate("/admin");
    }
  }, [message]);

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
        <div className="d-flex align-items-center gap-3">
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
      password: (
        <div className="d-flex align-items-center gap-1">
          <span style={{ fontSize: "10px" }}>
            {showPassword
              ? user.password.length > 7
                ? user.password.slice(0, 7) + "…"
                : user.password
              : "•••••••"}
          </span>
          {showPassword ? (
            <FcLock size={20} onClick={() => setShowPassword(false)} />
          ) : (
            <FcUnlock size={20} onClick={() => setShowPassword(true)} />
          )}
        </div>
      ),
      admin: (
        <div className="text-center">
          {message === `admin updating ${user.id}` ? (
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
          ) : user.admin ? (
            <FcApproval
              size={20}
              className="userActivate"
              onClick={() => handleUpdateUser("noAdmin", user.id)}
            />
          ) : (
            <FcCancel
              size={19}
              className="userBan"
              onClick={() => handleUpdateUser("admin", user.id)}
            />
          )}
        </div>
      ),
      socialUser: (
        <div className="text-center">
          {user.googleUser ? (
            <FcGoogle size={20} />
          ) : user.githubUser ? (
            <i
              className="fa-brands fa-github"
              style={{ color: "#1f1f1f" }}
              width={20}
            ></i>
          ) : (
            <FcCancel size={20} />
          )}
        </div>
      ),
      wishList: (
        <div className="text-center">
          <FcLike
            size={20}
            className="userWishlist"
            onClick={() => setShowUserFavsModal(user.favorites)}
          />
        </div>
      ),
      cart: (
        <div className="text-center">
          <FcCurrencyExchange
            size={20}
            className="userCart"
            onClick={() => setShowUserCartModal(user.cart)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={`${styles.wrapper} userDetails`}>
      <UserFavsModal />
      <UserCartModal />
      <div className={styles.title}>
        <div className={styles.goBack} onClick={() => navigate("/admin")}>
          <i className="fa-solid fa-caret-left fa-lg"></i>
        </div>
        <h3>User Info</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.userId}>
            <span>
              <i
                className="fa-solid fa-key fa-xs me-1"
                style={{ color: "#1f1f1f" }}
              ></i>
              ID:
            </span>
            <span>{userId}</span>
          </div>
          <div className={styles.avatar}>
            <img src={user?.avatar} alt="abc" />
          </div>
        </div>
        <div className={styles.right}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
