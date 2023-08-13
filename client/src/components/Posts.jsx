import React from "react";
import "./Posts.css";
import { useEffect, useState, useRef } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import EditPost from "./EditPost";
import { usePostContext } from "../contexts/PostContext";

const Posts = () => {
  const { postArray, setPostArray, setShowYourPost, postIds, setPostIds } =
    usePostContext();
  const { editPost } = usePostContext();
  const divRef = useRef(null);
  const [postInfiniteScrollIndex, setPostInfiniteScrollIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [prevScrollTop, setPrevScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop = divRef.current.scrollTop;
    if (currentScrollTop > prevScrollTop) {
      if (
        divRef.current.scrollHeight -
          divRef.current.scrollTop -
          divRef.current.clientHeight <
        1
      ) {
        setPostInfiniteScrollIndex((prev) => prev + 1);
      }
    }
    setPrevScrollTop(currentScrollTop);
  };

  useEffect(() => {
    const currentDivRef = divRef.current;

    if (currentDivRef) {
      currentDivRef.addEventListener("scroll", handleScroll);

      return () => {
        currentDivRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const fetchPostDetails = async () => {
      let arrayToSend = [];
      if (postIds.length > 0 && postInfiniteScrollIndex * 8 <= postIds.length) {
        for (
          let index = postInfiniteScrollIndex * 8;
          index < postIds.length && index < postInfiniteScrollIndex * 8 + 8;
          index++
        ) {
          const element = postIds[index];
          arrayToSend.push(element);
        }
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/post/all?ids=${arrayToSend}`,
            {
              headers: {
                token: token,
              },
            }
          );
          const posts = response.data;
          setPostArray((prev) => [...prev, ...posts]);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };
    fetchPostDetails();
  }, [postInfiniteScrollIndex, postIds]);

  useEffect(() => {
    const fetchAllPostIDs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/post/test`, {
          headers: {
            token: token,
          },
        });
        if (response) {
          const data = response.data;
          setPostIds([...data]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllPostIDs();
  }, []);

  return (
    <div className="postDiv">
      {editPost && <EditPost />}
      <div className="postOption">
        <button
          className="borderLessPostOption"
          onClick={() => setShowYourPost(true)}
        >
          Your Post
        </button>
        <button className="borderLessPostOption">Other Post</button>
      </div>
      <div className="postContainer" ref={divRef}>
        {postArray.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default Posts;
