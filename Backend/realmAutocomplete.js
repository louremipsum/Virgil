exports = async function({ query, headers, body}, response) {
    const { searchString } = query;

    if (!searchString || searchString === "" || searchString === "undefined") {
        return [];
    }

    const pipeline = [
        {
            $search: {
                index: "autocomplete",
                compound:{
                  should: [
                     {
                       autocomplete: {
                           query: searchString,
                           path: "title",
                          
                        },
                      },{
                        'text': {
                          'path': 'title',
                          'query': searchString,
                          fuzzy: {
                              maxEdits: 1,
                           },
                        }
                      },
          
                  ]
                },
                highlight: {
                    path: "title",
                },
            }
        },
        {
            $limit: 10,
        },
        {
            $project: {
                title: 1,
                highlights: {
                    $meta: "searchHighlights",
                },
            }
        },
    ];

    try {
        const collection = context.services.get("mongodb-atlas").db("scrape-data").collection("document");
        const result = await collection.aggregate(pipeline).toArray();
        return result;
    } catch (err) {
        console.error(err);
        response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(500);
        return { error: 'Server Error' };
    }
};
