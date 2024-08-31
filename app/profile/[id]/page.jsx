"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const UseProfile = ({params}) => {
  const [userPosts, setUserPosts] = useState([]);

  const searchParams=useSearchParams()
  const userName=searchParams.get("name")

  useEffect(() => {


    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/users/${params?.id}/posts`);

        const data = await res.json();

        console.log("profile data ->", data);
        setUserPosts(data);
      } catch (error) {
        console.log("Error in getProfile ->", error);
      }
    };

    if (params?.id) fetchPost();
  }, [params.id]);


  return (
    <div>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s  personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
        data={userPosts}
      />
    </div>
  );
};

export default UseProfile;
