import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";

const AllUsers = () => {
  const { data: creators, isLoading, isError } = useGetUsers();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  if (isError) {
    return (
      <div className="flex flex-1 justify-center items-center h-full">
        <p className="body-medium text-light-1">Something bad happened</p>
      </div>
    );
  }

  const filteredCreators = creators?.documents.filter((creator) =>
    creator.name.toLowerCase().includes(debouncedValue.toLowerCase()) ||
    creator.username.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        
        <div className="flex gap-2 w-full max-w-5xl">
          <Input 
            type="text"
            placeholder="Search users..."
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {filteredCreators?.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
