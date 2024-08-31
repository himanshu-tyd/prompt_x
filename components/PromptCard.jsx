"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const PromptCard = ({ posts, handleTagClick, handleEdit, handleDelete,handleClick }) => {
  const [copied, setCopied] = useState("");
  const route=useRouter()


  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(posts.prompt);
    navigator.clipboard.writeText(posts.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick=()=>{
    if(posts.creator._id==session?.user.id) return route.push('/profile')

    route.push(`/profile/${posts.creator._id}?name=${posts.creator.username}`);  
  }

 

  return (
    <div className="prompt_card">
      <div className="flex flex-between items-start gap-4">
        <div onClick={handleProfileClick} className=" flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={posts.creator.image}
            width={30}
            height={30}
            className="rounded-full object-contain"
            alt={posts.creator.username}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-bold text-gray-900">
              {posts.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {posts.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === posts.prompt
                ? `/assets/icons/tick.svg`
                : `/assets/icons/copy.svg`
            }
            height={14}
            width={14}
            alt="copy"
          />
        </div>
      </div>

      <p className="font-shatoshi my-4 text-sm text-gray-700">{posts.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(posts.tag)}
      >
        #{posts.tag}
      </p>

      {session?.user.id === posts.creator._id && pathName == "/profile" && (
        <div className="mt-5 flex-center gap-3 border-t border-gray-400 pt-3 ">
          <p
            className="font-inter text-sm green_gradient cursor-pointer  "
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer  "
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
