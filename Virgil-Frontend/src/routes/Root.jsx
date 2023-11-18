/**
 * The `Root` function is a React component that renders a search bar and a search button, and handles
 * the search functionality.
 * @returns The `Root` component is being returned.
 */
import { useState } from "react";
import { Box, Image, Stack, Button, Space, Center } from "@mantine/core";
import { autoComplete, getSearchResults } from "../apis/api";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Root() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, getSearchString] = useState("");
  const navigate = useNavigate();

  /**
   * The `handleSearch` function is an asynchronous function that takes a `searchString` as input and
   * performs a search operation, displaying the search results if found, and falling back to
   * autocomplete if no results are found.
   */
  const handleSearch = async (searchString) => {
    if (searchString) {
      try {
        setIsLoading(true);
        const res = await getSearchResults(searchString);
        if (!res.length) throw new Error("Search result not found");

        navigate(`/search?query=${encodeURIComponent(searchString)}`, {
          state: { searchResults: res },
        });
      } catch (error) {
        console.warn(error);
        try {
          const [top] = await autoComplete(searchString);
          const res = await getSearchResults(top.title);
          navigate(`/search?query=${encodeURIComponent(searchString)}`, {
            state: { searchResults: res },
          });
        } catch (error) {
          console.error("Error even after autocomplete", error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Stack align="center">
        <Image
          height={273}
          width={256}
          src="/logo_placeholder.svg"
          alt="Virgil"
        />
        <Space h="xl" />
        <Center py="lg">
          <SearchBar
            handleSearch={handleSearch}
            getSearchString={getSearchString}
          />
        </Center>
        <Box>
          <Button
            color="grape"
            radius="md"
            size="md"
            loading={isLoading}
            onClick={() => handleSearch(searchString)}
          >
            Search
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default Root;
