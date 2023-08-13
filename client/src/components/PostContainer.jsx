// import React from "react";
// import "./Posts.css";
// import { useEffect, useState, useRef } from "react";
// import PostCard from "./PostCard";
// import axios from "axios";
// import { usePostContext } from "../contexts/PostContext";

// const PostContainer = () => {
//   const {
//     postArray,
//     setPostArray,
//     postIds,
//     setPostIds,
//     postInfiniteScrollIndex,
//     setPostInfiniteScrollIndex,
//     shouldFetchPostIds,
//     setShouldFetchPostIds,
//   } = usePostContext();
//   const divRef = useRef(null);
//   const [prevScrollTop, setPrevScrollTop] = useState(0);
//   const [componentDidMount, setComponentDidMount] = useState(true);

//   const handleScroll = () => {
//     const currentScrollTop = divRef.current.scrollTop;
//     if (currentScrollTop > prevScrollTop) {
//       if (
//         divRef.current.scrollHeight -
//           divRef.current.scrollTop -
//           divRef.current.clientHeight <
//         1
//       ) {
//         setPostInfiniteScrollIndex((prev) => prev + 1);
//       }
//     }
//     setPrevScrollTop(currentScrollTop);
//   };

//   useEffect(() => {
//     const currentDivRef = divRef.current;

//     if (currentDivRef) {
//       currentDivRef.addEventListener("scroll", handleScroll);

//       return () => {
//         currentDivRef.removeEventListener("scroll", handleScroll);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     setPostArray([]);
//     setPostInfiniteScrollIndex(0);

//     return () => {
//       setPostArray([]);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchPostDetails = async () => {
//       let arrayToSend = [];
//       if (postIds.length > 0 && postInfiniteScrollIndex * 8 <= postIds.length) {
//         console.log(postInfiniteScrollIndex);
//         for (
//           let index = postInfiniteScrollIndex * 8;
//           index < postIds.length && index < postInfiniteScrollIndex * 8 + 8;
//           index++
//         ) {
//           const element = postIds[index];
//           arrayToSend.push(element);
//         }
//         try {
//           const token = localStorage.getItem("token");
//           const response = await axios.get(
//             `http://localhost:5000/post/all?ids=${arrayToSend}`,
//             {
//               headers: {
//                 token: token,
//               },
//             }
//           );
//           const posts = response.data;
//           setPostArray((prev) => [...prev, ...posts]);
//         } catch (error) {
//           console.error("Error fetching posts:", error);
//         }
//       }
//     };
//     if (!componentDidMount) {
//       fetchPostDetails();
//     } else {
//       setComponentDidMount(false);
//     }
//   }, [postInfiniteScrollIndex, postIds]);

//   useEffect(() => {
//     const fetchAllPostIDs = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`http://localhost:5000/post/test`, {
//           headers: {
//             token: token,
//           },
//         });
//         if (response) {
//           const data = response.data;
//           setPostIds([...data]);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//     if (shouldFetchPostIds) {
//       fetchAllPostIDs();
//       setShouldFetchPostIds(false);
//     }
//   }, []);

//   return (
//     <div className="postContainer" ref={divRef}>
//       {postArray.map((post) => (
//         <PostCard key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };
// export default PostContainer;
