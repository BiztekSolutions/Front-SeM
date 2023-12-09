/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
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
  message,
} from "antd";
import { MessageOutlined, EyeOutlined } from "@ant-design/icons";
import {
  fetchPosts,
  addOrUpdatePost,
  addCommentToPost,
} from "../../features/posts/postsSlice";

const { TextArea } = Input;

function Noticias() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState("");
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  console.log(posts, "posts");
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleCommentSubmit = async (postId, comment) => {
    dispatch(addCommentToPost({ postId, comment }));
    setComment("");
    message.success("Comentario agregado con éxito");
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
    message.success(
      `${selectedPost ? "Publicación editada" : "Nueva publicación"} con éxito`
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <h1>Foro</h1>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.id}
            actions={[
              <Space>
                <Tooltip title="Comentarios">
                  <Button
                    type="link"
                    icon={<MessageOutlined />}
                    onClick={() => handlePostSelect(post)}
                  ></Button>
                </Tooltip>
                <Tooltip title="Vistas">
                  <Button type="link" icon={<EyeOutlined />}>
                    {post.views}
                  </Button>
                </Tooltip>
              </Space>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={post.Client.User.avatar} />}
              title={
                <span className="flex justify-start items-start">
                  {post.Client.User.name} {post.Client.User.lastname}
                </span>
              }
            />
            <div className="bg-white p-4 my-4 shadow-md rounded-md">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.content}</p>
            </div>
          </List.Item>
        )}
      />

      <Modal
        title={selectedPost ? selectedPost.title : ""}
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedPost && (
          <div>
            <div className="bg-white p-4 my-4 shadow-md rounded-md">
              <h3 className="text-xl font-semibold mb-2">
                {selectedPost.title}
              </h3>
              <p className="text-gray-700 mb-4">{selectedPost.content}</p>
            </div>
            <Form
              form={form}
              onFinish={() => handleCommentSubmit(selectedPost.id, comment)}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Comentar
                </Button>
              </Form.Item>
            </Form>
            {selectedPost.Comments && selectedPost.Comments.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Comentarios:</h4>
                <ul className="list-disc pl-6">
                  {selectedPost.Comments.map((comment) => (
                    <div key={comment.id} className="mb-2">
                      <p className="text-gray-700">
                        <strong>{`${comment.Client.User.name} ${comment.Client.User.lastname}: `}</strong>
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>

      <div>
        <h2>Nueva Publicación</h2>
        <Form form={form} onFinish={handlePostSubmit}>
          <Form.Item label="Título" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Contenido" name="content">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Noticias;
