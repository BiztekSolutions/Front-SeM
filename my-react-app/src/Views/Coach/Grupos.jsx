import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Space } from "antd";
import styles from "./Users.module.css";
import { TailSpin } from "react-loader-spinner";
import Highlighter from "react-highlight-words";
import { FcFullTrash, FcApproval, FcCancel, FcInfo } from "react-icons/fc";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../features/user/userSlice";
import Swal from "sweetalert2";
// import "@sweetalert2/themes/dark/dark.css";

const Grupos = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users, message } = state.users;

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
    } else {
      dispatch(
        updateUser({
          userId: userId,
          data: {
            disabled: true,
          },
          action: `ban updating ${userId}`,
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

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.userName < b.userName) {
          return -1;
        }
        if (a.userName > b.userName) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("userName"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("email"),
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
  ];

  const dataSource = [];
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      dataSource.push({
        key: i,
        userName: users[i].userName,
        firstName: users[i].firstName,
        lastName: users[i].lastName,
        email: users[i].email,
        status: (
          <div className="userStatusSpan">
            <span
              className={`${users[i].logged ? "online" : "offline"}`}
            ></span>
            {users[i].logged ? "Online" : "Offline"}
          </div>
        ),
        actions: (
          <div className="d-flex align-items-center gap-3">
            <FcInfo
              size={19}
              className="userInfo"
              onClick={() => navigate(`user/${users[i].id}`)}
            />
            <FcFullTrash
              size={19}
              className="userDelete"
              onClick={() => handleDelete(users[i].userName, users[i].id)}
            />
            {message === `ban updating ${users[i].id}` ? (
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
            ) : users[i].disabled ? (
              <FcApproval
                data-activate={users[i].id}
                onClick={() => handleUpdateUser("activate", users[i].id)}
                size={19}
                className={styles.activate}
              />
            ) : (
              <FcCancel
                data-disable={users[i].id}
                onClick={() => handleUpdateUser("disable", users[i].id)}
                size={19}
                className="userBan"
              />
            )}
          </div>
        ),
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <h3>Users List</h3>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Grupos;
