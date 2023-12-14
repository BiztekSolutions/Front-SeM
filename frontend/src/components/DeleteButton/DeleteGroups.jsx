import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGroup } from "../../features/group/groupSlice";
import { FcFullTrash } from "react-icons/fc";
import { Modal } from "antd";

const DeleteGroups = ({ groupName, idGroup }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteGroup(idGroup));
    setModalVisible(false);
  };

  return (
    <>
      <FcFullTrash
        size={19}
        className="userDelete h-9 w-9"
        onClick={() => setModalVisible(true)}
      />

      <Modal
        title="¡Atención!"
        visible={modalVisible}
        onOk={handleDelete}
        onCancel={() => setModalVisible(false)}
        okText="Sí"
        cancelText="No"
      >
        <p>
          ¿Estás seguro de que deseas eliminar el grupo{" "}
          <strong>{groupName}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default DeleteGroups;
