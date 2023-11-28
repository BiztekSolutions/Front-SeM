import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Space, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styles from "./Users.module.css";
import { deleteUser, getUsers } from "../../features/user/userSlice";

//import "@sweetalert2/themes/dark/dark.css";

function ListaUsuarios({ dataSource }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users } = state.users;

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
    onFilter: (value, record) => {
      // Imprime en la consola los valores relevantes para la depuración
      console.log(record, "record");
      console.log(value, "value");

      // Convierte el valor de la columna y el valor del filtro a minúsculas
      const columnValue = record[dataIndex].toString().toLowerCase();
      const filterValue = value.toLowerCase();

      // Comprueba si el valor de la columna incluye el valor del filtro
      const isMatch = columnValue.includes(filterValue);

      // Devuelve true si hay coincidencia, de lo contrario, false
      return isMatch;
    },

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
      className: "text-3xl",
    },
  ];

  return (
    <div className={`${styles.wrapper}`}>
      <div>
        <Typography className="text-5xl">Lista de Usuarios</Typography>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="text-white text-xl"
        rowClassName="h-12"
      />
    </div>
  );
}

export default ListaUsuarios;
