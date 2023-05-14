import { Image, Button, Flex, Box, Group } from "@mantine/core";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { getSearchResults } from "../apis/api";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, getSearchString] = useState("");
  const navigate = useNavigate();
  const { string } = props;

  const handleSearch = async (searchString) => {
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
    <Flex
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      align="center"
      justify="space-between"
      p={"16px 24px"}
    >
      <Box
        style={{
          "& :hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/")}
      >
        <Image
          src="/src/assets/Logo.svg"
          alt="Virgil Logo"
          height={46}
          width={128}
        />
      </Box>
      <SearchBar
        handleSearch={handleSearch}
        getSearchString={getSearchString}
        fromSearch
        String={string}
      />
      <Group>
        <Button
          color="grape"
          radius="md"
          size="md"
          loading={isLoading}
          onClick={() => handleSearch(searchString)}
        >
          Search
        </Button>
      </Group>
    </Flex>
  );
}
