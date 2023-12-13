import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUsers, FaTimesCircle } from "react-icons/fa";
import { Typography, Collapse, Space, Button } from "antd";
import {
  getGroup,
  deleteClientFromGroup,
} from "../../../features/group/groupSlice";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import DeleteGroup from "../../../components/DeleteButton/DeleteGroups";

const { Panel } = Collapse;

function Group() {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.groups);
  const { id } = useParams();
  const groupId = id;
  const auth = useSelector((state) => state.auths);
  const [clientsList, setClientsList] = useState([]);
  console.log(group, "group");
  useEffect(() => {
    if (groupId) {
      console.log("groupId", groupId);
      dispatch(getGroup({ token: auth.token, idGroup: groupId }));
    }
  }, [groupId]);

  useEffect(() => {
    if (group.Clients) {
      setClientsList(group.Clients);
    }
  }, [group.Clients]);

  const handleDeleteClient = (clientId) => {
    dispatch(deleteClientFromGroup({ groupId, clientId }));
  };

  return (
    <div>
      {!group.Clients ? (
        <LoadingSpinner />
      ) : (
        <div className={`p-6 rounded-lg shadow-lg groupDetails`}>
          <div className="text-center">
            <div className="ml-5 text-4xl font-bold font-barlow-regular flex items-center justify-center gap-4">
              <div className="">
                <FaUsers className="text-4xl" />
              </div>
              <Typography.Title level={3} className="text-center">
                Detalles del Grupo {group.name}
              </Typography.Title>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Nombre del Grupo:
              </Typography.Text>
              <Typography.Text className="text-xl">
                {group.name}
              </Typography.Text>
            </div>
            <div className="w-fit flex flex-col gap-6 items-center">
              <Collapse accordion>
                <Panel header="Integrantes del Grupo:">
                  {clientsList.map((client) => (
                    // eslint-disable-next-line react/jsx-key
                    <Space className="flex flex-col">
                      <Typography.Text className="flex flex-row text-xl">
                        {client.User.name} {client.User.lastname}
                      </Typography.Text>
                      <Button
                        type="text"
                        icon={<FaTimesCircle />}
                        onClick={() => handleDeleteClient(client.idClient)}
                      />
                    </Space>
                  ))}
                </Panel>
              </Collapse>
            </div>
            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Eliminar Grupo:
              </Typography.Text>
              <Typography.Text className="text-left text-3xl mt-2 cursor-pointer">
                <DeleteGroup groupName={group.name} idGroup={group.idGroup} />
              </Typography.Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Group;
