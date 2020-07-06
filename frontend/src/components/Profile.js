import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { username } = useParams();

  return <div>{`welcome ${username}`}</div>;
};

export default Profile;
