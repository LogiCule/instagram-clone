import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetUserLikedPosts } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const LikedPosts = () => {
  const { id } = useParams();
  const { data: likedPosts, isLoading } = useGetUserLikedPosts(id || "");

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  if (!likedPosts || likedPosts.documents.length === 0)
    return <p className="text-light-4 text-center w-full">No liked posts</p>;

  return (
    <ul className="w-full flex justify-center max-w-5xl gap-9">
      <GridPostList posts={likedPosts.documents} showStats={false} />
    </ul>
  );
};

export default LikedPosts;
