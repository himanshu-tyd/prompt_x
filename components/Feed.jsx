"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loader from "./Loader";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          posts={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/prompt");

        const data = await res.json();

       
        setPost(data);
      } catch (error) {
        console.log("getPost Error", error);
      }
    };

    getPosts();
  }, []);

  return (
    <section className="feed">
      <form
        onSubmit={handleSearchChange}
        className="relative w-full flex-center"
      >
        <input
          type="search"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>

      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
