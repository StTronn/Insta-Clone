import React, { useState, useEffect } from "react";
import { URL } from "../utils";

const fetchAllPost = async (setLoading, setPosts) => {
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
    console.log(data.posts);
    setPosts({ posts: data.posts, error: false });
  } catch (err) {
    setLoading(false);
  }
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [{ posts, error }, setPosts] = useState({ posts: [], error: true });
  useEffect(() => {
    fetchAllPost(setLoading, setPosts);
  }, []);

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
