import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  Window,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  ChannelList,
  useChannelDeletedListener,
} from "stream-chat-react";
import { getUser, getUsers } from "../../features/user/userSlice";
import "stream-chat-react/dist/css/index.css";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_REACT_APP_STREAM_API_KEY;

export default function Mensajeria() {
  const dispatch = useDispatch();
  const [client, setClient] = useState(null);
  const state = useSelector((state) => state);
  const { user, users } = state.users;
  const filters = { type: "messaging", members: { $in: [user.id] } };
  const sort = { last_message_at: -1 };
  // const { id } = useParams();
  const id = "2f493bd206af6d447b34510213e79cd02c8551aa6ed9122a22bce31f86580d71";
  const handleUserClick = async (selectedUser) => {
    // Crear un nuevo canal con el usuario seleccionado y el usuario actual
    const newChannel = client.channel("messaging", {
      members: [selectedUser.id, user.id],
    });

    // Ver el nuevo canal
    await newChannel.watch();
  };
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const userDetails = {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  };
  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser(userDetails, chatClient.devToken(user.id));
      const channel = chatClient.channel("messaging", "react-talk", {
        name: "React Talk",
        image:
          "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
        members: [user.id],
      });

      await channel.watch();
      setClient(chatClient);
    }
    init();
    if (client) return () => client.disconnect();
  }, []);

  if (!client) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <LoadingIndicator size={200} />;
      </div>
    );
  }

  const newUsers = users.filter((u) => u.entrenador === false);

  return (
    <div className="messaging">
      <Chat client={client} theme="messaging light">
        <div>
          <h3>Usuarios</h3>
          <ul>
            {newUsers.map((u) => (
              <li key={u.id} onClick={() => handleUserClick(u)}>
                {u.firstName}
              </li>
            ))}
          </ul>
        </div>
        <ChannelList filters={filters} sort={sort} />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
