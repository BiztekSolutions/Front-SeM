import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Space } from "antd";
import styles from "./Users.module.css";
import Highlighter from "react-highlight-words";
import { FcFullTrash, FcInfo } from "react-icons/fc";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, deleteGroup } from "../../features/group/groupSlice";

const Groups = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { groups } = state.groups;
  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const handleDelete = (userName, userId) => {
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
    //     dispatch(deleteGroup(userId));
    //   } else if (result.isDenied) {
    //     return;
    //   }
    // });
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
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
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
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const dataSource = [];
  if (groups && groups.length > 0) {
    for (let i = 0; i < groups.length; i++) {
      dataSource.push({
        key: i,
        userName: groups[i].name,

        actions: (
          <div className="d-flex align-items-center gap-3">
            <FcInfo
              size={19}
              className="userInfo"
              onClick={() => navigate(`group/${groups[i].id}`)}
            />
            <FcFullTrash
              size={19}
              className="userDelete"
              onClick={() => handleDelete(groups[i].userName, groups[i].id)}
            />
          </div>
        ),
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <h3>Lista de Usuarios</h3>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Groups;
