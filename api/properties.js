export default async function handler(request, response) {
  response.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");

  const owner = process.env.GITHUB_OWNER || "mak0315";
  const repo = process.env.GITHUB_REPO || "MK-REAL-ESTATE-";
  const path = "data/properties";

  try {
    const listRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );

    if (!listRes.ok) {
      response.writeHead(listRes.status, { "Content-Type": "application/json" });
      return response.end(JSON.stringify([]));
    }

    const files = await listRes.json();
    const jsonFiles = Array.isArray(files)
      ? files.filter(f => f.type === "file" && f.name.endsWith(".json"))
      : [];

    const properties = [];
    for (const file of jsonFiles) {
      try {
        const fileRes = await fetch(file.download_url);
        if (fileRes.ok) {
          const prop = await fileRes.json();
          properties.push(prop);
        }
      } catch (e) {
        // skip individual file errors
      }
    }

    properties.sort((a, b) => {
      const dateA = new Date(a.dateAdded || 0);
      const dateB = new Date(b.dateAdded || 0);
      return dateB - dateA;
    });

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(properties));
  } catch (err) {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: err.message }));
  }
}
