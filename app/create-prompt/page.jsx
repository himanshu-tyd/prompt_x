"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


const CreatePrompt =() => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });


  const {data:session}=useSession()
  const router=useRouter()

  const createPrompt = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const res = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      

      if (res.ok) {
        router.push("/");
      }
    } catch (e) {
      console.log("EROR IN CREATE PROMPT ->", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
