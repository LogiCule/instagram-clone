import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultProps = {
  isSearchfetching: boolean;
  posts: Models.DocumentList<Models.Document> | undefined;
};

const SearchResults = ({ isSearchfetching, posts }: SearchResultProps) => {
  if (isSearchfetching) return <Loader />;

  if (posts && posts.documents.length > 0)
    return <GridPostList posts={posts.documents} />;
  return (
    <p className="text-light-4 mt-10 w-full text-center">No results found</p>
  );
};

export default SearchResults;
