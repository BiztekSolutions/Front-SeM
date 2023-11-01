import { useState, useContext } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Menu, Layout as AntLayout, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import { FcConferenceCall, FcShipped, FcFeedback } from "react-icons/fc";

import { GlobalContext } from "../../context/globalContext";
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
  const [current, setCurrent] = useState("userList");
  const [collapsed, setCollapsed] = useState(false);

  const globalContext = useContext(GlobalContext);
  const { setLogged } = globalContext;

  const onClick = (e) => {
    if (e.key !== "noticias") {
      navigate(e.key);
      setCurrent(e.key);
    } else {
      setCurrent(e.key);
      navigate("/coach");
    }
  };
  return (
    <AntLayout>
      <Sider
        trigger={null}
        theme="light"
        className="bg-white"
        collapsible
        collapsed={collapsed}
      >
        <div className="logo flex items-center justify-center">
          {collapsed ? (
            <div>
              <img
                src="/images/versace.svg"
                alt="abc"
                width={30}
                className="mt-2"
              />
            </div>
          ) : (
            <div className="flex items-start justify-start">
              <h2 className="mainTitle">Rivélle Admin</h2>
            </div>
          )}
        </div>
        <Menu
          theme={"light"}
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
          style={{ padding: 0, backgroundColor: "white" }}
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

            {/* BELL */}
            {/* <div className='relative'>
                <AppstoreFilled className='text-2xl'/>
                <span className='absolute notifications'>3</span>
            </div> */}

            {/* USER */}
            <div className="flex gap-3 items-center justify-center dropdown">
              {/* User Image */}
              <div
                className="header-user-image flex justify-center"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  width={30}
                  height={30}
                  className="img-fluid"
                  src="/images/user.svg"
                  alt="abc"
                />
              </div>
              {/* User Details */}
              <div className="d-flex flex-column gap-2 userData">
                <span style={{ marginTop: "-3rem" }}>User Name</span>
              </div>
              <ul
                className="dropdown-menu userDropdown"
                aria-labelledby="dropdownMenuButton1"
              >
                {/* <li><Link className="dropdown-item" to="/">View Profile</Link></li> */}
                <li>
                  <Link className="dropdown-item" to="/change-password">
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      console.log();
                      localStorage.removeItem("nerdyUser");
                      setLogged(false);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Header>

        <Content className="bg-gray-200 p-24 min-h-screen">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
export default Coach;
