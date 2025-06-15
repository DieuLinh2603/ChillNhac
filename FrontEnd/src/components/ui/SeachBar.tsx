import { Search } from "lucide-react";
import { Input } from "./input";
import { Link } from "react-router-dom";
import { useMusicStore } from "@/stores/useMusicStore";

const SearchBar = () => {
  const {query, setQuery} = useMusicStore();

  return (
    <form  className="flex items-center justify-between">
      <Input
        className="mr-4 w-80"
        placeholder="Nhập tên bài hát..."
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Link to={"/search"}>
        <Search />
      </Link>
    </form>
  );
};

export default SearchBar;
