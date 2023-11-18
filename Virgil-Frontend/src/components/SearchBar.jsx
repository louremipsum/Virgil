import React, { useState, useEffect } from "react";
import { Popover, TextInput, createStyles } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import AutoResults from "../components/AutoResults";
import { useDebouncedValue, getHotkeyHandler } from "@mantine/hooks";
import { autoComplete } from "../apis/api";

function SearchBar(props) {
  const { classes } = useStyles();
  const { getSearchString, handleSearch, fromSearch, String } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [searchString, setSearchString] = useState(fromSearch ? String : "");

  /*using the `useDebouncedValue` hook to create a debounced version of the `searchString` state variable. */
  const [debouncedSearchString] = useDebouncedValue(searchString, 300);
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [fetching, setFetching] = React.useState(false);
  const [showingPopover, setShowingPopover] = useState(false);

  /**
   * The above function is a useEffect hook that fetches autocomplete results based on a debounced search string state
   * and updates the AutoComplete Results array accordingly.
   */
  useEffect(() => {
    const fetchResults = async () => {
      getSearchString(searchString);
      if (debouncedSearchString && !fetching) {
        setFetching(true);
        try {
          if (debouncedSearchString.length >= 3) {
            const res = await autoComplete(debouncedSearchString);
            setAutoCompleteResults(res);
          }
          if (isFocused) setShowingPopover(true);
          else setShowingPopover(false);
        } catch (error) {
          console.log("error", error);
        } finally {
          setFetching(false);
        }
      }
    };

    fetchResults();
  }, [debouncedSearchString]);

  return (
    <Popover
      width="target"
      shadow="md"
      position="bottom"
      opened={
        showingPopover &&
        autoCompleteResults.length > 0 &&
        debouncedSearchString.length > 2
      }
      classNames={{
        dropdown: classes.dropdown,
      }}
    >
      <Popover.Target>
        <TextInput
          className={classes.input}
          placeholder="maybe start by searching ISBN..."
          variant="filled"
          radius="xl"
          size="md"
          value={searchString}
          onChange={(e) => setSearchString(e.currentTarget.value)}
          icon={<IconSearch />}
          onKeyDown={getHotkeyHandler([
            [
              "Enter",
              () => {
                handleSearch(searchString);
                setShowingPopover(false);
              },
            ],
          ])}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <AutoResults
          arr={autoCompleteResults}
          pop={setShowingPopover}
          setstring={setSearchString}
        />
      </Popover.Dropdown>
    </Popover>
  );
}

const useStyles = createStyles(() => ({
  input: {
    "& input[type=text]:focus-within": {
      width: "30rem",
      transition: "400ms cubic-bezier(0.18, 0.89, 0.32, 1.15)",
    },
    "& input[type=text]:not(:focus-within)": {
      transition: "400ms cubic-bezier(0.18, 0.89, 0.32, 1.15)",
    },
  },
  dropdown: {
    fontSize: 14,
  },
}));

export default SearchBar;
