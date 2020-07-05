import React, { useState, useEffect, useContext } from "react";
import { Store } from "../store";
import { URL } from "../utils";

const fetchAllPost = async (setLoading, dispatch) => {
  try {
    setLoading(true);
    const response = await fetch(URL + "/post/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setLoading(false);
    console.log("fetching", data.posts);
    dispatch({
      type: "GET_POSTS",
      payload: { posts: data.posts, error: false },
    });
  } catch (err) {
    dispatch({ action: "GET_POSTS", payload: { posts: [], error: true } });
    setLoading(false);
  }
};
const Home = () => {
  const { state, dispatch } = useContext(Store);
  const { posts, error } = state.allPostsObj;
  const [loading, setLoading] = useState(false);
  console.log(state);
  useEffect(() => {
    fetchAllPost(setLoading, dispatch);
  }, [dispatch]);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>something went wrong </div>;
  else
    return (
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    );
};

export default Home;
