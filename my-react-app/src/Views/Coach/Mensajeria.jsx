import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { FcInfo } from "react-icons/fc";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/user/userSlice";
import Chat from "./Chat";

function Mensajeria() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users } = state.users;

  const [selectedUser, setSelectedUser] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

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
      title: "Nombre",
      dataIndex: "firstName",
      key: "firstName",
      defaultSortOrder: "ascend",
      className: "text-3xl",
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
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
      defaultSortOrder: "ascend",
      className: "text-3xl",
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
      className: "text-3xl",
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
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex align-items-center gap-3">
          <FcInfo
            size={19}
            className="userInfo h-9 w-9"
            onClick={() => {
              setSelectedUser(users[record.key]);
              setShowChat(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleOpenChat = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedUser(null);
  };

  const dataSource = users.map((user, index) => ({
    key: index,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    actions: (
      <div className="flex align-items-center gap-3">
        <FcInfo
          size={19}
          className="userInfo h-9 w-9"
          onClick={() => handleOpenChat(user)}
        />
      </div>
    ),
  }));

  const handleSendMessage = (userId, message) => {
    // Lógica para manejar el envío de mensajes desde el frontend
    console.log(`Enviando mensaje a ${userId}: ${message}`);
    // Puedes realizar operaciones de Redux aquí si es necesario
  };

  return (
    <div
      className="wrapper flex flex-col"
      style={{ backgroundColor: "#202932" }}
    >
      <div>
        <h3 className="text-5xl">Mensajeria</h3>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="text-white text-xl"
        rowClassName="h-12"
      />
      {showChat && selectedUser && (
        <Chat
          user={selectedUser}
          onClose={handleCloseChat}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default Mensajeria;
