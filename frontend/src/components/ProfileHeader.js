import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const MobileWrapper = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  padding-left: 1rem;
  .mobile-profile-stats span {
    padding-right: 1rem;
  }
  .mobile-bio,
  .mobile-profile-stats {
    display: none;
  }
  @media screen and (max-width: 645px) {
    .mobile-bio {
      display: block;
    }
    .mobile-profile-stats {
      display: block;
      margin-bottom: 0.4rem;
    }
  }
  a {
    color: ${(props) => props.theme.blue};
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  .avatar {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 90px;
    margin-right: 2rem;
  }
  .profile-meta {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
  }
  .profile-meta h2 {
    position: relative;
    top: 3px;
  }
  .profile-stats {
    display: flex;
    margin-bottom: 1rem;
  }
  .options svg {
    position: relative;
    top: 7px;
    margin-left: 1rem;
  }
  span {
    padding-right: 1rem;
  }
  a {
    color: ${(props) => props.theme.blue};
  }
  @media screen and (max-width: 645px) {
    font-size: 1rem;
    .bio,
    .profile-stats {
      display: none;
    }
    .avatar {
      width: 140px;
      height: 140px;
    }
    .profile-meta {
      flex-direction: column;
    }
    button {
      margin-left: 0;
    }
    .bio-mobile {
      margin: 1rem 0;
      display: block;
    }
  }
  @media screen and (max-width: 420px) {
    font-size: 0.9rem;
    .avatar {
      width: 100px;
      height: 100px;
    }
  }
`;

const modalHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #DBDBDB",
  padding: "1rem",
};
const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  padding-right: 2rem;
  font-size: 0.9rem;
  width: 350px;
  img {
    width: 40px;
    object-fit: cover;
    height: 40px;
    border-radius: 20px;
    margin-right: 1rem;
  }
  .profile-info {
    display: flex;
  }
  span {
    color: ${(props) => props.theme.secondaryColor};
  }
  button {
    font-size: 0.9rem;
    position: relative;
    top: -10px;
  }
  @media screen and (max-width: 480px) {
    width: 340px;
  }
`;

// `

const ProfileHeader = () => {
  return (
    <Wrapper>
      <img
        className="avatar"
        src={
          "https://img.cinemablend.com/filter:scale/quill/e/c/5/e/d/9/ec5ed98a27d0516306a02fb32c9b6048ad16d3ce.jpg?fw=1200"
        }
        alt="avatar"
      />
      <div className="profile-info">
        <div className="profile-meta">
          <h2>User</h2>
        </div>

        <div className="profile-stats"></div>

        <div className="bio"></div>
      </div>
    </Wrapper>
  );
};

export default ProfileHeader;
