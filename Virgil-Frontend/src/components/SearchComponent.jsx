import { Flex, Text, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";
import WikipeadiaHeader from "./WikipeadiaHeader";

export default function SearchComponent(props) {
  const { results } = props;
  const { classes } = useStyles();

  return (
    <Flex direction={"column"} className={classes.comp}>
      <WikipeadiaHeader text={results.title} />
      <Link
        to={results.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Text fw={700} size="lg" align={"left"} fz="lg">
          {results.title}
        </Text>
      </Link>
      <Text size="sm" lineClamp={4} align={"left"}>
        {results.highlights[0].texts.map((text, index) => {
          if (text.type === "hit") {
            return <b key={index}>{text.value}</b>;
          } else {
            return <span key={index}>{text.value}</span>;
          }
        })}
      </Text>
    </Flex>
  );
}

const useStyles = createStyles(() => ({
  comp: {
    margin: "1rem 1.5rem",
    padding: "0.5rem",
    textDecoration: "none",
  },
}));
