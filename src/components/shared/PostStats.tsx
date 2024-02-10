import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked, checkIsSaved } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = { post?: Models.Document; user: string };

const PostStats = ({ post, user }: PostStatsProps) => {
  const [likes, setLikes] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: deleteSavePost, isPending: isUnSaving } = useDeleteSavePost();
  const { data: currentuser } = useGetCurrentUser();

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let likesArray = [...likes];
    if (!isLiked) {
      likesArray.push(user);
      likePost({ postId: post?.$id || "", likesArray });
      setIsLiked(true);
    } else {
      likesArray = likes.filter((like) => like !== user);
      likePost({
        postId: post?.$id || "",
        likesArray: likesArray,
      });
      setIsLiked(false);
    }
    setLikes(likesArray);
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      const userSave = currentuser?.save?.find(
        (save: Models.Document) => save.post.$id === post?.$id
      );
      deleteSavePost(userSave.$id);
      setIsSaved(false);
    } else {
      savePost({ postId: post?.$id || "", userId: user });
      setIsSaved(true);
    }
  };

  useEffect(() => {
    setIsLiked(checkIsLiked(likes, user));
  }, [likes, user]);

  useEffect(() => {
    if (post?.save) setIsSaved(checkIsSaved(post.save, user));
    setLikes(post?.likes.map((user: Models.Document) => user.$id));
  }, [user, post]);

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        {isLiking ? (
          <Loader />
        ) : (
          <>
            <img
              src={`/assets/icons/like${isLiked ? "d" : ""}.svg`}
              alt="like"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={handleLikePost}
            />
            <p className="small-medium lg:base-medium">{likes.length}</p>
          </>
        )}
      </div>

      <div className="flex gap-2 ">
        {isSaving || isUnSaving ? (
          <Loader />
        ) : (
          <img
            src={`/assets/icons/save${isSaved ? "d" : ""}.svg`}
            alt="like"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleSavePost}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
