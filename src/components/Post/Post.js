import React, { useState, useEffect } from 'react';
import Spinner from "../Spinner";
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;

  ul {
    list-style: none;
    padding: 0px 20px;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top: 3px solid blue;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);

    li {
      transition: transform .2s ease-out;
      padding: 10px 0px;
      border-top: 1px solid blue;


      :first-of-type {
        border-top: none;
      }
      a, a:hover, a:focus, a:active {
        text-decoration: none;
        color: inherit;
      }
      img{
        width: calc(80vw - 40px);
      }
    }
  }
`;


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(1);

  const API = "http://localhost:3004/posts";

  useEffect(() => {
    fetch(`${API}?_page=${page}`)
    .then(response => response.json())
    .then(response => setPosts(response))
    .catch(error => {
      console.log("There was an error with request: ", error);
    });
  }, []);

  const fetchMoreData = () => {
    fetch(`${API}?_page=${page}`)
    .then(response => response.json())
    .then(response => {
      setPage(page + 1);
      if (response.length === 0) {
        setHasMoreItems(false);
      }
      return setPosts(posts.concat(response))
    })
    .catch(error => {
      console.log("There was an error with request: ", error);
    });
  };

  if (posts === []) {
    return <Spinner />
  }
  return (
    <Container>
      <InfiniteScroll
      pageStart={0}
      loadMore={fetchMoreData}
      hasMore={hasMoreItems}
      loader={<div className="loader" key={0}><Spinner /></div>}
      >
        <ul>
          {posts.map(post => {
            return (
              <li key={post.date}>
                <a href={post.url} target="blank"><h2>{post.date}  {post.title}</h2></a>
                <a href={post.url} target="blank"><img src={post.thumb} alt={post.title} /></a>
                <a href={post.url} target="blank"><p> {post.excerpt}</p></a>
              </li>
            )
          })}
        </ul>
      </InfiniteScroll>
    </Container>
  );
}

export default Posts;
