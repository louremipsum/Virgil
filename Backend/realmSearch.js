exports = async function ({ query, headers, body }, response) {
  const { searchString } = query;

  if (!searchString || searchString === "" || searchString === "undefined") {
    return [];
  }

  const pipeline = [
    {
      $search: {
        index: "index",
        compound: {
          should: [
            {
              text: {
                query: searchString,
                path: ["text", "title"],
              },
            },
          ],
          filter: [
            {
              regex: {
                query: searchString,
                path: ["text", "title"],
                allowAnalyzedField: true,
              },
            },
          ],
        },
        highlight: {
          path: ["title", "text"],
        },
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        text: 1,
        title: 1,
        url: 1,
        score: {
          $meta: "searchScore",
        },
        highlights: {
          $meta: "searchHighlights",
        },
      },
    },
  ];

  try {
    const collection = context.services
      .get("mongodb-atlas")
      .db("scrape-data")
      .collection("document");
    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (err) {
    console.error(err);
    response.setHeader("Content-Type", "application/json");
    response.setStatusCode(500);
    return { error: "Server Error" };
  }
};
