import { useState, useContext } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  Dropdown,
  Menu,
  Layout as AntLayout,
  Button,
  ConfigProvider,
  theme,
  Typography,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.png";
import { GlobalContext } from "../context/globalContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleSidebar } from "@/features/layout/layoutSlice";

const { Header, Sider, Content } = AntLayout;

const CustomLayout = ({ items }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auths.user);
  const layout = useSelector((state) => state.layout);

  const { defaultAlgorithm, darkAlgorithm } = theme;
  console.log("USUARIO", user);
  console.log("Layout", layout);

  const handleLogout = () => {
    setLogged(false);
    navigate("/");
  };
  const { setLogged } = useContext(GlobalContext);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`./changePassword/${user.userId}`}>Cambiar contraseña</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleLogout()}>
        Salir
      </Menu.Item>
    </Menu>
  );

  const navigate = useNavigate();
  const [current, setCurrent] = useState("noticias");

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
    <ConfigProvider
      theme={{
        algorithm: layout.isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <AntLayout>
        <Sider
          trigger={null}
          collapsible
          collapsed={layout.isSidebarCollapsed}
          theme={layout.isDarkMode ? "dark" : "light"}
        >
          <div className="logo flex items-center justify-center">
            {layout.isSidebarCollapsed ? (
              <div>
                <img src={logo} alt="abc" width={30} className="mt-2" />
              </div>
            ) : (
              <div className="flex items-start justify-start m-10">
                <Typography>Salud en Movimiento</Typography>
              </div>
            )}
          </div>
          <Menu
            onClick={onClick}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[current]}
            mode="inline"
            items={items}
            theme={layout.isDarkMode ? "dark" : "light"}
          />
        </Sider>
        <AntLayout>
          <Header
            className="flex justify-between px-1 pe-5"
            style={{
              padding: 0,
              backgroundColor: layout.isDarkMode ? "#001529" : "white",
              borderBottom: "1px solid #ffff",
              marginBottom: "1rem",
            }}
          >
            <div className="flex items-center">
              <Button
                type="text"
                icon={
                  layout.isSidebarCollapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() => dispatch(toggleSidebar())}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            {/* @TODO: Esta flag no se ve */}
            <div className="flex gap-5 items-center">
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
                <button onClick={() => dispatch(toggleDarkMode())}>
                  Toggle
                </button>
                {/* User Details */}
                <div className="d-flex flex-column userData pr-10">
                  <span style={{ marginTop: "-3rem" }}>
                    {user.name} {user.lastname}
                  </span>
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
          <Content className="p-24 pt-0 mt-0 min-h-screen">
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    </ConfigProvider>
  );
};
export default CustomLayout;
