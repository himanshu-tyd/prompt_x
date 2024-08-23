"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${id}`);

      const data = await res.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (id) getPromptDetails();
  }, [id]);

  const UpdatePrompt = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const res = await fetch(`api/prompt/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (e) {
      console.log("EROR IN UPDATE PROMPT ->", e);
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
    />
  );
};

export default EditPrompt;
