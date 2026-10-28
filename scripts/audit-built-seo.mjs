import fs from "node:fs";
import path from "node:path";

const ORGANIZATION_ID = "https://zameett.com/#organization";
const EXPECTED_FOUNDER_IDS = [
  "https://zameett.com/about/founders#ahad-mubashir",
  "https://zameett.com/about/founders#zameet-mubashir",
];
const rows = [];
const invalidJsonLd = [];
const breadcrumbIssues = [];
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

function findStructuredDataByType(value, type, matches = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => findStructuredDataByType(item, type, matches));
    return matches;
  }
  if (!value || typeof value !== "object") return matches;
  if (value["@type"] === type) matches.push(value);
  Object.values(value).forEach((item) => findStructuredDataByType(item, type, matches));
  return matches;
}

function cleanBreadcrumbText(value = "") {
  return value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSameSiteUrl(value) {
  if (typeof value !== "string" || !value) return "";
  try {
    const url = new URL(value, "https://zameett.com");
    if (url.origin !== "https://zameett.com") return "";
    url.search = "";
    url.hash = "";
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return "";
  }
}

function getVisibleBreadcrumb(source, canonical) {
  const html = source.match(/<p class="[^"]*\bcrumb\b[^"]*">([\s\S]*?)<\/p>/)?.[1] || "";
  const names = cleanBreadcrumbText(html).split(/\s*\/\s*/).filter(Boolean);
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((match) => ({
    name: cleanBreadcrumbText(match[2]),
    item: normalizeSameSiteUrl(match[1]),
  }));
  return {
    names,
    anchors: anchors.map((anchor) => ({ ...anchor, index: names.indexOf(anchor.name) })),
    canonical,
  };
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
    const parsedJsonLd = [];

    for (const serialized of jsonLd) {
      try {
        const parsed = JSON.parse(serialized);
        parsedJsonLd.push(parsed);
        inspectStructuredData(parsed, normalizedFile);
      } catch (error) {
        invalidJsonLd.push({ file: normalizedFile, error: error.message });
      }
    }
    const systemPage = normalizedFile.includes("_not-found") || normalizedFile.includes("_global-error");
    const indexable = !systemPage && !/noindex/i.test(robots);
    const hasVisibleBreadcrumb = /class="[^"]*\bcrumb\b[^"]*"/.test(source);
    const breadcrumbs = parsedJsonLd.flatMap((value) => findStructuredDataByType(value, "BreadcrumbList"));

    if (indexable && hasVisibleBreadcrumb) {
      if (!breadcrumbs.length) {
        breadcrumbIssues.push({
          file: normalizedFile,
          canonical,
          issue: "missing BreadcrumbList",
        });
      } else {
        const visibleBreadcrumb = getVisibleBreadcrumb(source, canonical);
        const structurallyValid = breadcrumbs.every((breadcrumb) => {
          const entries = breadcrumb.itemListElement;
          return Array.isArray(entries) && entries.length >= 2 && entries.every((item, index) => {
            const finalItem = index === entries.length - 1;
            const hasItemProperty = item && Object.hasOwn(item, "item");
            const normalizedItem = normalizeSameSiteUrl(item?.item);
            return item?.["@type"] === "ListItem" &&
              item.position === index + 1 &&
              typeof item.name === "string" &&
              item.name.trim() &&
              (finalItem ? !hasItemProperty || normalizedItem === canonical : Boolean(normalizedItem));
          });
        });
        const matchesVisibleHierarchy = breadcrumbs.some((breadcrumb) => {
          const entries = breadcrumb.itemListElement;
          if (!Array.isArray(entries) || entries.length !== visibleBreadcrumb.names.length) return false;
          const linkedHierarchyMatches = visibleBreadcrumb.anchors.every((anchor) => {
              const item = entries[anchor.index];
              return anchor.index >= 0 &&
                cleanBreadcrumbText(item?.name) === anchor.name &&
                normalizeSameSiteUrl(item?.item) === anchor.item;
            });
          const finalSchemaName = cleanBreadcrumbText(entries.at(-1)?.name);
          const finalVisibleName = visibleBreadcrumb.names.at(-1);
          const pageTitle = cleanBreadcrumbText(title).replace(/\s*\|\s*Zameett$/i, "");
          return linkedHierarchyMatches &&
            (finalSchemaName === finalVisibleName || finalSchemaName === pageTitle);
        });
        if (!structurallyValid || !matchesVisibleHierarchy) {
          breadcrumbIssues.push({
            file: normalizedFile,
            canonical,
            issue: !structurallyValid
              ? "invalid breadcrumb positions, items, or final canonical"
              : "schema does not match the visible breadcrumb hierarchy",
          });
        }
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
  breadcrumbIssues,
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
  breadcrumbIssues.length ||
  entityProviderMismatches.length ||
  serviceIdentityIssues.length ||
  missingFounderEntities.length ||
  duplicateTitles.length ||
  duplicateDescriptions.length ||
  duplicateCanonicals.length
) process.exitCode = 1;
