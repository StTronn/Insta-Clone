import React, { useEffect, useState } from "react";
import { URL } from "../utils";
import ProfileHeader from "./ProfileHeader";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 930px;
  margin: 0 auto;
  .profile-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.4rem 0;
  }
  .profile-tab div {
    display: flex;
    cursor: pointer;
    margin-right: 3rem;
  }
  .profile-tab span {
    padding-left: 0.3rem;
  }
  .profile-tab svg {
    height: 24px;
    width: 24px;
  }
  hr {
    border: 0.5px solid ${(props) => props.theme.borderColor};
  }
`;

const getUser = async (username, setUser) => {
  try {
    const response = await fetch(URL + "/user/" + username);
    const user = await response.json();
    user.error = false;
    setUser(user);
  } catch (err) {
    console.log(err);
    setUser({ error: true });
  }
};

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(false);
  useEffect(() => {
    getUser(username, setUser);
  }, [username]);
  if (user)
    return (
      <Wrapper>
        <ProfileHeader user={user} />
        <hr />
      </Wrapper>
    );
  else
    return (
      <Wrapper>
        <h1> Loading</h1>
      </Wrapper>
    );
};

export default Profile;
