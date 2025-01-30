import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SearchtBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const SearchtBy = searchParams.get("SearchtBy") || "";

  function handleChange(e) {
    searchParams.set("SearchtBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={SearchtBy}
      onChange={handleChange}
    />
  );
}

export default SearchtBy;
