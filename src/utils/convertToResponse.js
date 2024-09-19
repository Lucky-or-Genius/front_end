export function transformApiResponse(apiResponse) {
  const structuredResults = [];

  for (const [title, content] of Object.entries(apiResponse)) {
    const result = {
      title,
      sources: {},
      summary: content.summary || [],
      conclusion: content.conclusion || "",
    };

    // Transform sources
    if (content.sources) {
      content.sources.forEach((source) => {
        result.sources[source.id] = {
          title: source.title,
          url: source.url,
        };
      });
    }

    structuredResults.push(result);
  }

  return structuredResults;
}
