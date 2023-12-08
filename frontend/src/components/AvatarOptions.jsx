import React, { useState } from "react";
import { Select } from "antd";
import * as avatars from "@dicebear/avatars";
import * as maleSprites from "@dicebear/avatars-male-sprites";
import * as femaleSprites from "@dicebear/avatars-female-sprites";

const { Option } = Select;

const AvatarOptions = ({ onSelectAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarChange = (value) => {
    setSelectedAvatar(value);
    onSelectAvatar(value);
  };

  const avatarSeeds = [
    "Bella",
    "Jack",
    "Mimi",
    "Buddy",
    "Buster",
    "Dusty",
    "Harley",
    "Milo",
    "Simba",
    "Angel",
    "Fluffy",
    "Sugar",
    "Snowball",
    "Trouble",
    "Bubba",
    "Daisy",
    "Charlie",
    "Oliver",
  ]; // Agrega más seeds según tus preferencias

  return (
    <div>
      <h3>Selecciona tu avatar:</h3>
      <Select
        placeholder="Selecciona un avatar"
        style={{ width: "130px", marginTop: "16px" }}
        onChange={handleAvatarChange}
        value={selectedAvatar}
      >
        {avatarSeeds.map((seed) => (
          <Option key={seed} value={seed}>
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
              alt={`Avatar ${seed}`}
              style={{ width: "70px", height: "70px", marginRight: "8px" }}
            />
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AvatarOptions;
