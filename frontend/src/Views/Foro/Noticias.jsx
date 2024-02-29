/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const userLogged = useSelector((state) => state.auths.user);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState("");
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem("User"));
  const location = useLocation();
  const isCoachPage = location.pathname.includes("/coach");

  const isUserAClient = clients?.some((client) => client.idUser === user.user);
  useEffect(() => {
    dispatch(fetchPosts(user.token));

    dispatch(getClients(user.token));
  }, [dispatch, posts.Comments]);

  const foundClient = clients?.find((client) => client.idUser === user.user);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleCommentSubmit = async (idPost, comment) => {
    if (!foundClient) {
      dispatch(showErrorNotification("Error", "No eres un cliente."));
      return;
    }
    dispatch(
      addCommentToPost({ idPost, comment, idClient: foundClient.idClient })
    );
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
    setSelectedPost(null);
    form.resetFields();
    dispatch(
      showSuccessNotification(
        "Éxito",
        `${selectedPost ? "Publicación editada" : "Nueva publicación"} creada.`
      )
    );
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
    setTimeout(() => {
      dispatch(fetchPosts());
    }, 1000);
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
    <div className="m-auto mt-[5%] w-[70%]">
      <Typography className="tittle-module">Foro</Typography>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.idPost}
            actions={[
              <Space>
                <Tooltip title="Comentarios">
                  <Button
                    type="link"
                    icon={<MessageOutlined />}
                    onClick={() => handlePostSelect(post)}
                  ></Button>
                </Tooltip>
                {userLogged?.idUser === post?.Client?.idUser ? (
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
                <Avatar src={post?.Client?.User && post.Client.User.avatar} />
              }
              title={
                <span className="flex justify-start items-start">
                  {post?.Client?.User?.name} {post?.Client?.User.lastname}
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
      <Modal
        title={selectedPost ? selectedPost.title : ""}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedPost && (
          <div>
            <div className="p-4 my-4 shadow-md rounded-md">
              <Typography.Title
                level={3}
                className="text-xl font-semibold mb-2"
              >
                {selectedPost.title}
              </Typography.Title>
              <Typography className="mb-4">{selectedPost.content}</Typography>
            </div>
            <Form
              form={form}
              onFinish={() => handleCommentSubmit(selectedPost.idPost, comment)}
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
                      handleCommentSubmit(selectedPost.idPost, comment)
                    }
                    className="bg-blue-500"
                  >
                    Comentar
                  </Button>
                </div>
              </Form.Item>
            </Form>
            {selectedPost.Comments && selectedPost.Comments.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Comentarios:</h4>
                <ul className="list-disc pl-6">
                  {selectedPost.Comments.map((comment) => (
                    <div key={comment.idComment} className="mb-2">
                      <Avatar
                        src={comment.Client?.User && comment.Client.User.avatar}
                      />
                      <strong>{`${comment.Client.User.name} ${comment.Client.User.lastname}: `}</strong>
                      <div className="flex justify-between">
                        <Typography className="">{comment.content}</Typography>
                        {userLogged.idUser === comment.Client.idUser ? (
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
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
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
  );
}

export default Noticias;
