import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const router = useRouter();
  const onChangeHandler = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (searchQuery.trim() === query.trim()) {
      return;
    }
    if (!query.trim()) {
      props.setToggleSearch(false);
      return router.push(currentLocation);
    }
    router.push(`/search/${query.trim()}`);
  };
  const onCloseHandler = () => {
    props.setToggleSearch(false);
    if (currentLocation !== router.asPath) router.push(currentLocation);
    if (searchQuery) setSearchQuery("");
  };

  useEffect(() => {
    if (props.toggleSearch && currentLocation !== router.asPath) {
      setCurrentLocation(router.asPath);
    }
  }, [props.toggleSearch]);
  return (
    <div
      className={`search__container ${
        props.toggleSearch && "search__container--show"
      }`}
    >
      <input
        type="text"
        className="search"
        placeholder="Search for a movie,tv show or a person..."
        value={searchQuery}
        onChange={onChangeHandler}
      />
      <span className="close-search" onClick={onCloseHandler}>
        <AiOutlineClose />
      </span>
    </div>
  );
};

export default SearchBar;
