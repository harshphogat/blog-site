import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { Query } from "appwrite";

import { getAllPost } from "../store/authSlice";

function AllPosts() {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  let user_id = null;
  useSelector((state) => (user_id = state.userData.$id));

  console.log(user_id);

  let allPost = null;
  useSelector((state) => (allPost = state.allPost));
  if (allPost) {
    console.log("ALL POSTS : IN ALLPOST FILE", allPost);
  }

  useEffect(() => {
    // appwriteService.getPosts([Query.or([Query.equal("status", "active"), Query.equal("userId", user_id)])])
    if (!allPost) {
      appwriteService
        .getPosts([Query.equal("userId", user_id)])
        .then((posts) => {
          console.log(posts);
          if (posts) {
            console.log("USE EFFECT : ", posts.documents);
            setPosts(posts.documents);
            dispatch(getAllPost(posts.documents));
          }
        });
    }
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
