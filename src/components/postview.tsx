import { type RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className={"flex gap-3 border-b border-slate-400 p-8"}>
      <Image
        src={author.profileImageUrl}
        alt={`@${author.username} profile image`}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex gap-1">
          <a href={`/@${author.username}`}>
            <span>{`@${author.username}`}</span>
          </a>
          <span>·</span>
          <a href={`/post/${post.id}`}>
            <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
          </a>
        </div>

        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};
