import React from "react";
import { PostType } from "@/types";

import Image from "next/image";
import Link from "next/link";

type Props = {
  post: PostType;
};

const Post = (props: Props) => {
  const { post } = props;

  console.log(post.author.profile.profileImageUrl);
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${post.authorId}`}>
            <Image
              className="w-10 h-10 rounded-full mr-2"
              src={post.author.profile?.profileImageUrl}
              alt="Profile Image"
              width={40}
              height={40}
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{post.author?.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
