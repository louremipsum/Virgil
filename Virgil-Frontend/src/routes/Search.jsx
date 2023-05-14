import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import SearchComponent from "../components/SearchComponent";
import Header from "../components/Header";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const [Result, setResult] = useState([]);
  useEffect(() => {
    const { searchResults } = location.state || {};
    if (searchResults) {
      setResult(searchResults);
    } else {
      console.log("hallo from else");
    }
  }, [location.state, searchQuery]);

  return (
    <>
      <Header string={searchQuery} />
      <Grid columns={1} mr={500}>
        {Result.map((item) => (
          <SearchComponent results={item} key={item._id} />
        ))}
      </Grid>
    </>
  );
}

export default Search;
