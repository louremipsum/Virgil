import { Flex, Text, Avatar } from "@mantine/core";
import React from "react";

function WikipeadiaHeader(props) {
  const { text } = props;
  return (
    <Flex direction={"row"} align={"center"} mb={"sm"}>
      <Avatar
        src="/src/public/wikipedia.png"
        size={"sm"}
        alt="wikipedia"
        mr={"sm"}
        radius={"xl"}
      />
      <Flex direction={"column"}>
        <Text fz={14}>Wikipedia</Text>
        <Text fz={12} c={"dimmed"}>
          https://en.wikipedia.org &gt; wiki &gt; {text}{" "}
        </Text>
      </Flex>
    </Flex>
  );
}

export default WikipeadiaHeader;
