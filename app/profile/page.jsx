"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const [profile, setProfile] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (profile) => {
    router.push(`/update-prompt?id=${profile._id}`);
  };

  const handleDelete = async (profile) => {
    const isConfirmt = confirm("Are you sure you want to delete this prompt?");

    if (isConfirmt) {
      try {
        await fetch(`/api/prompt/${profile._id}`, {
          method: "DELETE",
        });

        setProfile((prev) => prev.filter((p) => p._id !== profile._id));
      } catch (e) {
        console.log("error in handleDelete ->", e);
      }
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);

        const data = await res.json();

        console.log("profile data ->", data);
        setProfile(data);
      } catch (error) {
        console.log("Error in getProfile ->", error);
      }
    };

    if (session?.user.id) getProfile();
  }, [session?.user.id]);

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={profile}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
