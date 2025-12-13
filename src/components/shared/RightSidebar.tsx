import UserCard from "@/components/shared/UserCard";
import Loader from "@/components/shared/Loader";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const RightSidebar = () => {
  const { data: creators, isLoading, isError } = useGetUsers(10);

  if (isError) {
    return (
      <div className="flex flex-1 justify-center items-center h-full">
        <p className="body-medium text-light-1">Something bad happened</p>
      </div>
    );
  }

  return (
    <div className="home-creators">
      <h3 className="h3-bold text-light-1">Top Creators</h3>
      {isLoading && !creators ? (
        <Loader />
      ) : (
        <ul className="grid 2xl:grid-cols-2 gap-6">
          {creators?.documents.map((creator) => (
            <li key={creator?.$id}>
              <UserCard user={creator} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RightSidebar;
