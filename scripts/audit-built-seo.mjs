import fs from "node:fs";
import path from "node:path";

const ORGANIZATION_ID = "https://zameett.com/#organization";
const EXPECTED_FOUNDER_IDS = [
  "https://zameett.com/about/founders#ahad-mubashir",
  "https://zameett.com/about/founders#zameet-mubashir",
];
const rows = [];
const invalidJsonLd = [];
const entityProviderMismatches = [];
const serviceIdentityIssues = [];
const structuredDataNodes = [];

function inspectStructuredData(value, file) {
  if (Array.isArray(value)) {
    value.forEach((item) => inspectStructuredData(item, file));
    return;
  }
  if (!value || typeof value !== "object") return;

  structuredDataNodes.push(value);
  if (value.provider && value.provider["@id"] !== ORGANIZATION_ID) {
    entityProviderMismatches.push({
      file,
      type: value["@type"] || "",
      name: value.name || "",
      provider: value.provider,
    });
  }
  if (value["@type"] === "Service" && value.provider?.["@id"] === ORGANIZATION_ID && (!value["@id"] || !value.url)) {
    serviceIdentityIssues.push({ file, name: value.name || "", id: value["@id"] || "", url: value.url || "" });
  }

  Object.values(value).forEach((item) => inspectStructuredData(item, file));
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;

    const source = fs.readFileSync(file, "utf8");
    const normalizedFile = file.replaceAll("\\", "/");
    const title = source.match(/<title>(.*?)<\/title>/)?.[1] || "";
    const desc = source.match(/<meta name="description" content="([^"]*)"/)?.[1] || "";
    const canonical = source.match(/<link rel="canonical" href="([^"]*)"/)?.[1] || "";
    const ogUrl = source.match(/<meta property="og:url" content="([^"]*)"/)?.[1] || "";
    const twitterTitle = source.match(/<meta name="twitter:title" content="([^"]*)"/)?.[1] || "";
    const h1 = (source.match(/<h1(?:\s|>)/g) || []).length;
    const robots = source.match(/<meta name="robots" content="([^"]*)"/)?.[1] || "";
    const jsonLd = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);

    for (const serialized of jsonLd) {
      try {
        inspectStructuredData(JSON.parse(serialized), normalizedFile);
      } catch (error) {
        invalidJsonLd.push({ file: normalizedFile, error: error.message });
      }
    }
    rows.push({ file: normalizedFile, title, desc, canonical, ogUrl, twitterTitle, h1, robots, jsonLd: jsonLd.length });
  }
}

walk(".next/server/app");

const duplicateValues = (key) =>
  Object.entries(rows.reduce((groups, row) => {
    if (row[key]) (groups[row[key]] ??= []).push(row.file);
    return groups;
  }, {})).filter(([, files]) => files.length > 1);

const issues = rows.filter((row) => {
  const systemPage = row.file.includes("_not-found") || row.file.includes("_global-error");
  const privatePage = /noindex/i.test(row.robots);
  return !row.title || (!row.desc && !systemPage) || (!row.canonical && !systemPage && !privatePage) || row.h1 !== 1;
});
const socialMismatches = rows
  .filter((row) => row.canonical && row.ogUrl && row.canonical !== row.ogUrl)
  .map(({ file, canonical, ogUrl }) => ({ file, canonical, ogUrl }));
const genericTwitterTitle = "Zameett | Fashion Design &amp; Product Development";
const missingOrInheritedSocial = rows
  .filter((row) =>
    row.canonical &&
    !/noindex/i.test(row.robots) &&
    (row.canonical !== "https://zameett.com" || row.twitterTitle !== genericTwitterTitle) &&
    (!row.ogUrl || !row.twitterTitle || row.twitterTitle === genericTwitterTitle),
  )
  .map(({ file, canonical, ogUrl, twitterTitle }) => ({ file, canonical, ogUrl, twitterTitle }));
const duplicateTitles = duplicateValues("title");
const duplicateDescriptions = duplicateValues("desc");
const duplicateCanonicals = duplicateValues("canonical");
const personIds = new Set(
  structuredDataNodes.filter((node) => node["@type"] === "Person" && node["@id"]).map((node) => node["@id"]),
);
const missingFounderEntities = EXPECTED_FOUNDER_IDS.filter((id) => !personIds.has(id));

console.log(JSON.stringify({
  htmlPages: rows.length,
  issues,
  socialMismatches,
  missingOrInheritedSocial,
  invalidJsonLd,
  entityProviderMismatches,
  serviceIdentityIssues,
  missingFounderEntities,
  duplicateTitles,
  duplicateDescriptions,
  duplicateCanonicals,
}, null, 2));

if (
  issues.length ||
  socialMismatches.length ||
  missingOrInheritedSocial.length ||
  invalidJsonLd.length ||
  entityProviderMismatches.length ||
  serviceIdentityIssues.length ||
  missingFounderEntities.length ||
  duplicateTitles.length ||
  duplicateDescriptions.length ||
  duplicateCanonicals.length
) process.exitCode = 1;
