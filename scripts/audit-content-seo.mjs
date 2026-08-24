import { ARTICLES } from "../src/app/blog/articles.js";
import { POSTS } from "../src/app/blog/posts.js";
import { SEO_POSTS } from "../src/app/blog/seo-posts.js";

const redirectedSlugs = new Set(["garment-sampling-process-modest-fashion"]);
const targetSlugs = new Set(SEO_POSTS.map((post) => post.slug));
const words = (value) => (JSON.stringify(value).match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*/g) || []).length;
const duplicates = (key) => Object.entries(POSTS.reduce((groups, post) => {
  const value = post[key]?.toLowerCase().trim();
  if (value) (groups[value] ??= []).push(post.slug);
  return groups;
}, {})).filter(([, slugs]) => slugs.length > 1);

const issues = [];
const rows = POSTS.map((post) => {
  const article = ARTICLES[post.slug];
  const wordCount = article ? words(article) : 0;
  if (!article) issues.push(`${post.slug}: missing article body`);
  if (targetSlugs.has(post.slug) && wordCount < 450) issues.push(`${post.slug}: target article body below 450 words (${wordCount} words)`);
  if (!post.primaryKeyword) issues.push(`${post.slug}: missing distinct primary keyword`);
  if (targetSlugs.has(post.slug) && !post.searchIntent) issues.push(`${post.slug}: missing distinct search intent`);
  if (post.title.length > 65) issues.push(`${post.slug}: long title (${post.title.length} characters)`);
  if (post.description.length < 120 || post.description.length > 165) issues.push(`${post.slug}: description length ${post.description.length}`);
  for (const slug of post.related || []) {
    if (redirectedSlugs.has(slug)) issues.push(`${post.slug}: internal link uses redirected slug ${slug}`);
    else if (!POSTS.some((candidate) => candidate.slug === slug)) issues.push(`${post.slug}: related slug not found ${slug}`);
  }
  return {
    slug: post.slug,
    primaryKeyword: post.primaryKeyword || "legacy article",
    words: wordCount,
    titleLength: post.title.length,
    descriptionLength: post.description.length,
  };
});

const activeSlugs = new Set(POSTS.map((post) => post.slug));
const orphanBodies = Object.keys(ARTICLES).filter((slug) => !activeSlugs.has(slug) && !redirectedSlugs.has(slug));
if (orphanBodies.length) issues.push(`orphan article bodies: ${orphanBodies.join(", ")}`);
for (const [title, slugs] of duplicates("title")) issues.push(`duplicate title "${title}": ${slugs.join(", ")}`);
for (const [keyword, slugs] of duplicates("primaryKeyword")) issues.push(`duplicate primary keyword "${keyword}": ${slugs.join(", ")}`);
for (const [intent, slugs] of duplicates("searchIntent")) issues.push(`duplicate search intent "${intent}": ${slugs.join(", ")}`);

console.log(JSON.stringify({ posts: POSTS.length, targetArticles: targetSlugs.size, rows, issues }, null, 2));
if (issues.length) process.exitCode = 1;
