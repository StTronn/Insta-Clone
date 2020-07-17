import React, { useEffect, useState } from "react";
import Placeholder from "../components/Placeholder";
import { URL } from "../utils";
import ProfileHeader from "./ProfileHeader";
import PostPreview from "./PostPreview";
import { PostIcon, SavedIcon } from "./Icons";
import Loader from "../components/Loader";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 930px;
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

const getUser = async (username, setUser, setLoading, setDeadend) => {
  try {
    const response = await fetch(URL + "/user/" + username);
    const user = await response.json();
    console.log(user);
    user.error = false;
    setUser(user);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setUser({ error: true });
    setDeadend(true);
  }
};
// `

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deadend, setDeadend] = useState(false);
  const [tab, setTab] = useState("POSTS");
  useEffect(() => {
    getUser(username, setUser, setLoading, setDeadend);
  }, [username]);

  if (!deadend && loading) {
    return <Loader />;
  }

  if (deadend) {
    return (
      <Placeholder
        title="Sorry, this page isn't available"
        text="The link you followed may be broken, or the page may have been removed"
      />
    );
  }
  if (user)
    return (
      <Wrapper>
        <ProfileHeader user={user} />
        <hr />
        <div className="profile-tab">
          <div
            style={{ fontWeight: tab === "POSTS" ? "500" : "" }}
            onClick={() => setTab("POSTS")}
          >
            <PostIcon />
            <span>Posts</span>
          </div>
          <div
            style={{ fontWeight: tab === "SAVED" ? "500" : "" }}
            onClick={() => setTab("SAVED")}
          >
            <SavedIcon />
            <span>Saved</span>
          </div>
        </div>
        <PostPreview posts={user.posts} />
      </Wrapper>
    );
  else
    return (
      <Wrapper>
        <h1> Loading </h1>
      </Wrapper>
    );
};

export default Profile;
