function imageUrl(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") return item.image || item.src || item.path || item.url || "";
  return "";
}

function normalizePhotos(photos, coverImage) {
  const list = (Array.isArray(photos) ? photos : []).map(imageUrl).filter(Boolean);
  if (!list.length && coverImage) list.push(coverImage);
  return list;
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");

  const owner = process.env.GITHUB_OWNER || "mak0315";
  const repo = process.env.GITHUB_REPO || "MK-REAL-ESTATE-";
  const path = "data/properties";

  try {
    const listRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      { headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "MK-Real-Estate-CMS" } }
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
        const fileRes = await fetch(file.download_url, { headers: { "User-Agent": "MK-Real-Estate-CMS" } });
        if (fileRes.ok) {
          const prop = await fileRes.json();
          properties.push({
            ...prop,
            // Use the CMS file name as the canonical URL slug. This also fixes
            // older entries that saved a title (with spaces) into a slug field.
            slug: file.name.replace(/\.json$/i, ""),
            tags: Array.isArray(prop.tags) ? prop.tags : [],
            amenities: Array.isArray(prop.amenities) ? prop.amenities : [],
            photographs: normalizePhotos(prop.photographs, prop.coverImage),
          });
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
