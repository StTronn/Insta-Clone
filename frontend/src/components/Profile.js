import React from "react";
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

const Profile = () => {
  const { username } = useParams();

  return (
    <Wrapper>
      <ProfileHeader />
      <hr />
    </Wrapper>
  );
};

export default Profile;
