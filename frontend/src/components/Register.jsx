import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import AvatarOptions from "./AvatarOptions";
import { clearUserMessage, register, loginUser } from "../features/auth/authSlice";
import { showSuccessNotification, showErrorNotification } from "@/features/layout/layoutSlice";
import { getUsers, getCoaches } from "../features/user/userSlice";
import styles from "./Modals/Login.module.css"; 
import { ModalContext } from "../context/ModalContext";

const credentialsInitialState = {
  password: "",
  name: "",
  lastname: "",
  email: "",
  repeatPassword: "",
  avatar: "",
};

function Register({ isRegisterOpen, setRegisterOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auths = useSelector((state) => state.auths);
  const users = useSelector((state) => state.users);
  const [avatar, setAvatar] = useState("");
  const { message, token, user, userId, isLoading } = auths;
  const { coaches } = users;
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const {
    setModal,
  } = useContext(ModalContext);
  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setLogged } = globalContext;

  const [form] = Form.useForm();

  function handleSubmit(values) {
    if (isRegisterOpen) {
      const newErrors = {};
      if (avatar === "") newErrors.avatar = "Seleccione un avatar";
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      values.avatar = avatar.avatar;
      values.email = values.email.toLowerCase();
      dispatch(register(values));
    } else {
      values.email = values.email.toLowerCase();
      dispatch(loginUser(values));
    }
    setSubmit(true);
    setErrors({});
    setAvatar("");
  }



  const handleRegister = () => {
    setRegisterOpen(!isRegisterOpen);
    form.resetFields();
  };

  useEffect(() => {
    // LOGIN MANUALLY RESPONSE
    if (message === "User registered successfully") {
      dispatch(
        showSuccessNotification(
          "Bienvenido",
          "Es un gusto tenerte con nosotros!"
        )
      );
      setTimeout(() => {
        dispatch(clearUserMessage());
        // Clear message state & close Login modal
        setRegisterOpen(false);
        form.resetFields();
      }, 2100);
    }

    if (
      message === "Email Incorrect" ||
      message === "Password Incorrect"
    ) {
      dispatch(
        showErrorNotification(
          "Error",
          "El email o la contraseña son incorrectos"
        )
      );
      dispatch(clearUserMessage());
    }

    if (message === "User already exists") {

      dispatch(
        showErrorNotification(
          "Error",
          "Ya existe un usuario creado con esas credenciales. Por favor, inicie sesión."
        )
      );
      dispatch(clearUserMessage());
    }

    if (message === "User logged" && submit) {
      // Setear LS con userID encriptado
      if (token && userId) {
        localStorage.setItem(
          "User",
          JSON.stringify({ user: userId, token: token })
        );

        dispatch(getCoaches(token));
        dispatch(getUsers(token));
      }

      // setLogged to allow functionalities
      setLogged({
        userId: user.idUser,
      });

      dispatch(
        showSuccessNotification("Hola", `Bienvenido de vuelta!`)
      );

    }
  }, [message, user, isLoading]);

  useEffect(() => {
    // Verificar si hay cambios en el estado de coaches
    if (coaches !== null && submit) {
      const isUserACoach = coaches?.some((coach) => coach.idUser === userId);


      if (isUserACoach) {
        navigate("/coach");
      } else {
        navigate(`/user/${user.idUser}`);
      }
    }
  }, [coaches]);


  const handleSelectAvatar = (selectedAvatar) => {
    setAvatar({
      avatar: selectedAvatar,
    });
  };


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <div className="w-full bg-white">
        <div className="px-3 w-full max-w-full">
          <div className="grid grid-rows-none gap-4">
            <Form
              form={form}
              onFinish={handleSubmit}
              initialValues={credentialsInitialState}
            >{
                isRegisterOpen && (
                  <>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: "Ingrese su nombre" }]}
                    >
                      <Input placeholder="Nombre" />
                    </Form.Item>
                    <Form.Item
                      name="lastname"
                      rules={[{ required: true, message: "Ingrese su apellido" }]}
                    >
                      <Input placeholder="Apellido" />
                    </Form.Item>
                  </>

                )}
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Ingrese su correo electrónico" },
                  { type: 'email', message: 'Ingrese un correo electrónico válido' },
                ]}
              >
                <Input placeholder="Correo electrónico" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Ingrese una contraseña" }]}
              >
                <Input.Password
                  placeholder="Contraseña"
                  iconRender={(visible) =>
                    visible ? <MdVisibility /> : <MdVisibilityOff />
                  }
                />
              </Form.Item>
              {isRegisterOpen && (
                <>
                  <Form.Item
                    name="repeatPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: "Repita la contraseña" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Las contraseñas no coinciden'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Repita la contraseña"
                      iconRender={(visible) =>
                        visible ? <MdVisibility /> : <MdVisibilityOff />
                      }
                    />
                  </Form.Item>
                  <div className="">
                    <AvatarOptions onSelectAvatar={handleSelectAvatar} />
                    {errors.avatar && (
                      <p className="text-red-500 text-sm">{errors.avatar}</p>
                    )}
                  </div>
                </>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "black" }}>
                  Enviar
                </Button>
              </Form.Item>
            </Form>
            {!isRegisterOpen && (
              <span >
              <a
                  onClick={() => setModal("forgotPasswordModal", true)}
                className={
                  styles.forgotPassword
                }
              >
                Olvidé mi contraseña
              </a>
            </span>
            )}  

            <Button onClick={handleRegister} type="text" style={{ marginBottom: "10px" }}>
              {isRegisterOpen
                ? "Cambiar a iniciar sesión"
                : "Cambiar a crear cuenta"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
