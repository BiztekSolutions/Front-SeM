import { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  // DownOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Layout as AntLayout, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import { FcConferenceCall, FcShipped, FcFeedback } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/logo.png";
// import { GlobalContext } from "../../context/globalContext";
const { Header, Sider, Content } = AntLayout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const handleLogout = () => {
  console.log("logout");
};
const menu = (
  <Menu>
    <Menu.Item key="1">
      <Link to="/change-password">Change Password</Link>
    </Menu.Item>
    <Menu.Item key="2" onClick={() => handleLogout()}>
      Logout
    </Menu.Item>
  </Menu>
);

const items = [
  getItem("General", "sub1", <FcConferenceCall size={20} />, [
    getItem("Noticias", "noticias"),
  ]),
  getItem("Usuarios", "sub2", <FcConferenceCall size={20} />, [
    getItem("Lista de usuarios", "listaDeUsuarios"),
    getItem("Grupos", "grupos"),
  ]),
  getItem("Rutinas", "sub3", <FcShipped size={20} />, [
    getItem("Lista de rutinas", "listaDeRutinas"),
    getItem("Agregar rutina", "agregarRutina"),
  ]),
  getItem("Mensajeria", "sub4", <FcFeedback size={20} />, [
    getItem("Mensajeria", "mensajeria"),
  ]),
];

const Coach = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("listaDeUsuarios");
  const [collapsed, setCollapsed] = useState(false);

  // const globalContext = useContext(GlobalContext);
  // const { setLogged } = globalContext;

  const onClick = (e) => {
    if (e.key !== "listaDeUsuarios") {
      navigate(e.key);
      setCurrent(e.key);
    } else {
      setCurrent(e.key);
      navigate("/coach");
    }
  };
  return (
    <AntLayout>
      <Sider trigger={null} theme="light" collapsible collapsed={collapsed}>
        <div className="logo flex items-center justify-center">
          {collapsed ? (
            <div>
              <img src={logo} alt="abc" width={30} className="mt-2" />
            </div>
          ) : (
            <div className="flex items-start justify-start m-10">
              <h2 className="mainTitle">Salud en Movimiento</h2>
            </div>
          )}
        </div>
        <Menu
          theme={"black"}
          onClick={onClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Sider>
      <AntLayout>
        <Header
          className="flex justify-between px-1 pe-5"
          style={{ padding: 0, backgroundColor: "grey" }}
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            {/* NAVBAR */}
            {/* <div className='nav-bar ms-3 flex items-center'>
              <input className='form-control form-input' type="text" placeholder='Search' />
            </div> */}
          </div>

          <div className="flex gap-5 items-center">
            {/* FLAG */}
            <div>
              <Flag code={"arg"} height={"15"} />
            </div>

            <div className="flex gap-3 items-center justify-center dropdown">
              <div
                className="header-user-image flex justify-center"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></div>
              {/* User Details */}
              <div className="d-flex flex-column userData pr-10">
                <span style={{ marginTop: "-3rem" }}>User Name</span>
              </div>
              <div>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                    href="/#"
                  >
                    <CgProfile className="h-8 w-8 mr-20" />
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </Header>

        <Content className="bg-gray-800 p-24 min-h-screen">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
export default Coach;
