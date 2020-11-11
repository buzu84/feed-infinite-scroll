import React, { useState, useEffect } from 'react'
import Spinner from "../Spinner";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const API = "http://localhost:3004/posts";

  useEffect(() => {
    fetch(`${API}`)
    .then(response => response.json())
    .then(response => setPosts(response))
    .then(console.log("posts; ", posts))
    .catch(error => {
      console.log("There was an error with request: ", error);
    });
  }, [posts]);


  if (posts === []) {
    return <Spinner />
  }
  return (
    <div className="container">
      <ul>
        {posts.map(post => {
          return (
            <li className="post_element" key={post.date}>
              <img className="picture" src={post.thumb} alt={post.title} />
              <h2 className="event_name">{post.date}  {post.title}</h2>
              <p className="peak_hour"> {post.excerpt}</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Posts;
