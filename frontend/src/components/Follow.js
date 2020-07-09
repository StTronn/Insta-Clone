import React, { useContext, useEffect, useState } from "react";
import Button from "../styles/Button";
import { client } from "../utils";
import { Store } from "../store";

const follows = async (loggedUser, showUser, setFollow) => {
  const data = await client("/user/follows", {
    body: { userId: showUser.id, followerId: loggedUser.id },
  });
  console.log(data);
};

const Follow = ({ showUser }) => {
  const [follow, setFollow] = useState(false);
  const { state } = useContext(Store);
  const { user } = state;
  useEffect(() => {
    follows(user, showUser, setFollow);
  }, [user, showUser]);
  if (user.username !== showUser.username)
    return (
      <>
        {follow ? (
          <Button secondary>Following</Button>
        ) : (
          <Button>Follow</Button>
        )}
      </>
    );
  else
    return (
      <>
        <Button secondary>Edit</Button>
      </>
    );
};
export default Follow;
