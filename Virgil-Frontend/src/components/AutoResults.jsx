import React from "react";
import { Text, createStyles, Stack } from "@mantine/core";

export default function AutoResults(props) {
  //   console.log("hello from AutoResults ->", props.data);
  const { classes } = useStyles();
  const { arr, pop, setstring } = props;
  return (
    <>
      {arr.map((result) => (
        <Stack
          key={result._id}
          className={classes.popoverText}
          onClick={() => {
            setstring(result.title);
            pop(false);
          }}
        >
          <Text weight={500} align="left" c={"black"}>
            {result.title}
          </Text>
        </Stack>
      ))}
    </>
  );
}

const useStyles = createStyles(() => ({
  popoverText: {
    padding: "0.25rem",
    margin: 0,
    "& :hover": {
      backgroundColor: "Highlight",
      cursor: "pointer",
    },
  },
}));
