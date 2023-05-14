import React, { useState } from "react";
import { Box, Image, Stack, Button, Space, Center } from "@mantine/core";
import { getSearchResults } from "../apis/api";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Root() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, getSearchString] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (searchString) => {
    console.log("search String ->", searchString);
    if (searchString) {
      try {
        setIsLoading(true);
        const res = await getSearchResults(encodeURIComponent(searchString));
        setIsLoading(false);
        navigate(`/search?query=${encodeURIComponent(searchString)}`, {
          state: { searchResults: res },
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <Stack align="center">
        <Image
          height={273}
          width={256}
          src="/src/assets/logo_placeholder.svg"
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
