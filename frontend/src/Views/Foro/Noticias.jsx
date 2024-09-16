/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';

import {
  List,
  Avatar,
  Space,
  Input,
  Button,
  Form,
  Tooltip,
  Modal,
  Typography,
} from "antd";

import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import MessageOutlined from "@ant-design/icons/MessageOutlined";

import {
  fetchPosts,
  addOrUpdatePost,
  addCommentToPost,
  deletePost,
  deleteComment,

} from "@/features/posts/postsSlice";
import { getClients } from "@/features/user/userSlice";
import { useLocation } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";


const { TextArea } = Input;

function Noticias() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const { clients } = useSelector((state) => state.users);
  const userLogged = useSelector((state) => state.auths.userId);

  const [comment, setComment] = useState("");
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem("User"));
  const location = useLocation();
  const isCoachPage = location.pathname.includes("/coach");
  const [index, setIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchPosts(user?.token));
    dispatch(getClients(user?.token));
  }, [dispatch, posts.Comments]);


  const isUserAClient = clients?.some((client) => client.idUser === user?.user);
  const foundClient = clients?.find((client) => client.idUser === user.user);


  const handlePostSelect = (index) => {
    setIndex(index);
    setModalVisible(true);
  };

  const handleCommentSubmit = async (idPost, comment) => {
    if (!foundClient && !isCoachPage) {
      dispatch(showErrorNotification("Error", "No eres un cliente."));
      return;
    }
    dispatch(addCommentToPost({ idPost, comment, idUser: user.user }));
    setComment("");

    setTimeout(() => {
      dispatch(fetchPosts());
    }, 1000);

    if (status === "succeeded") {
      dispatch(showSuccessNotification("Éxito", "Comentario agregado."));
    }
  };

  const handlePostSubmit = (values) => {
    dispatch(
      addOrUpdatePost({
        title: values.title,
        content: values.content,
      })
    );

    form.resetFields();
    dispatch(
      showSuccessNotification(
        "Éxito",
        `Publicación creada`
      )
    )
    setTimeout(() => {
      dispatch(fetchPosts());
    }, 1000);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function handleDeletePost(id) {
    dispatch(deletePost(id));
    dispatch(showSuccessNotification("Éxito", "Publicación eliminada."));
    dispatch(fetchPosts());

  }
  function handleDeleteComment(commentId) {
    dispatch(deleteComment(commentId));

    setTimeout(() => {
      dispatch(fetchPosts());
    }, 1000);

    if (status === "succeeded") {
      dispatch(showSuccessNotification("Éxito", "Comentario eliminado."));
    }

  }
  if (!isUserAClient && !isCoachPage) {
    return (
      <Typography.Title level={3}>
        NO TIENES ACCESO A ESTA PARTE DE LA PAGINA PONTE EN CONTACTO CON LAS
        ENTRENADORAS PARA QUE TE AGREGUEN COMO CLIENTE
      </Typography.Title>
    );
  }

  return (
    <>

      <div className="m-auto mt-20 sm:mt-[5%] w-[70%]">
        <Typography className="tittle-module">Foro</Typography>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          renderItem={(post, index) => (
            <List.Item
              key={post.idPost}
              actions={[
                <Space>
                  <Tooltip title="Comentarios">
                    <Button
                      type="link"
                      icon={<MessageOutlined />}
                      onClick={() => handlePostSelect(index)}
                    ></Button>
                  </Tooltip>
                  {userLogged === post?.Coach?.idUser ? (
                    <Tooltip title="Eliminar Post">
                      <Button
                        type="link"
                        danger
                        onClick={() => handleDeletePost(post.idPost)}
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Tooltip>
                  ) : null}
                </Space>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={post?.Coach?.User && post.Coach.User.avatar} />
                }
                title={
                  <span className="flex justify-start items-start">
                    {post?.Coach?.User?.name} {post?.Coach?.User.lastname}
                  </span>
                }
              />
              <div className="p-4 my-4 shadow-lg rounded-md">
                <Typography.Title level={3}>{post.title}</Typography.Title>
                <Typography className="mb-4">{post.content}</Typography>
              </div>
            </List.Item>
          )}
        />

        {isCoachPage && (
          <div className="">
            <Typography.Title level={2}>Nueva Publicación</Typography.Title>
            <Form form={form} onFinish={handlePostSubmit} layout="vertical">
              <Form.Item
                label="Título:"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el título de la publicación.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Contenido:"
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el contenido de la publicación.",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="bg-blue-500">
                  Agregar
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
      <Modal
        title={posts[index] ? posts[index].title : ""}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        style={isMobile ? { top: 0, paddingBottom: 0, borderRadius: 0, paddingRight: '20px', height: '100vh', width: '100%', maxWidth: '100%' } : {}}
      >
        {posts[index] && (
          <div>
            <div className="p-4 my-4 shadow-md rounded-md">

              <Typography className="mb-4">{posts[index].content}</Typography>
            </div>
            <Form
              form={form}
              onFinish={() => handleCommentSubmit(posts[index].idPost, comment)}
            >
              <Form.Item>
                <TextArea
                  placeholder="Escribe un comentario..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={() =>
                      handleCommentSubmit(posts[index].idPost, comment)
                    }
                    className="bg-blue-500"
                  >
                    Comentar
                  </Button>
                </div>
              </Form.Item>
            </Form>
            {posts[index].Comments && posts[index].Comments.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Comentarios:</h4>
                <ul className="list-disc pl-6">
                  {posts[index].Comments.map((comment) => {
                    console.log(comment)
                    return (
                      <div key={comment.idComment} className="mb-2">
                        <Avatar
                          src={comment.Client ? comment.Client.User.avatar : comment.Coach.User.avatar}
                        />
                        <strong>{comment.Client ? `${comment.Client.User.name} ${comment.Client.User.lastname}: ` : `${comment.Coach.User.name} ${comment.Coach.User.lastname}: `}</strong>
                        <div className="flex justify-between">
                          <Typography className="">{comment.content}</Typography>
                          {userLogged === (comment.Client?.idUser || comment.Coach.idUser) ? (
                            <Tooltip title="Eliminar Comentario">
                              <Button
                                type="link"
                                danger
                                onClick={() =>
                                  handleDeleteComment(comment.idComment)
                                }
                                icon={<DeleteOutlined />}
                              ></Button>
                            </Tooltip>
                          ) : null}
                        </div>
                      </div>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

export default Noticias;
