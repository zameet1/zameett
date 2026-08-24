import fs from "node:fs";
import path from "node:path";
import { POSTS } from "../src/app/blog/posts.js";
import { GIGS } from "../src/app/services/gigs.js";
import { SOLUTIONS } from "../src/app/solutions/solutions.js";
import { PRODUCTS } from "../src/app/shop/products.js";
import { ARTICLES } from "../src/app/blog/articles.js";
import { POLICIES } from "../src/lib/policyContent.js";
import { PUBLIC_STATIC_ROUTES } from "../src/lib/seo.js";

const base=[...PUBLIC_STATIC_ROUTES.map((route)=>route||"/"),...Object.keys(POLICIES).map((slug)=>`/${slug}`),"/sign-in","/account","/admin","/reset-password","/resources/fashion-development-brief-checklist.pdf"];
const routes=new Set([...base,...POSTS.map(p=>"/blog/"+p.slug),...GIGS.map(p=>"/services/"+p.slug),...SOLUTIONS.map(p=>"/solutions/"+p.slug),...PRODUCTS.map(p=>"/shop/"+p.slug)]);
const broken=[],missingImages=[],missingArticles=[],invalidRelatedLinks=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(/\.(js|jsx)$/.test(e.name)){const s=fs.readFileSync(f,"utf8");for(const m of s.matchAll(/(?:href|serviceHref)\s*[:=]\s*"([^"]+)"/g)){const raw=m[1];if(!raw.startsWith("/")||raw.includes("$"+"{")||raw.startsWith("/api/"))continue;const clean=raw.split(/[?#]/)[0]||"/";if(!routes.has(clean)&&!clean.startsWith("/shop/")&&!clean.startsWith("/resources/"))broken.push([f,raw]);}}}}
walk("src");
for(const p of POSTS)if(!fs.existsSync(path.join("public",p.image)))missingImages.push([p.slug,p.image]);
for(const p of POSTS){
  if(!ARTICLES[p.slug])missingArticles.push(p.slug);
  for(const slug of p.related||[])if(!POSTS.some((candidate)=>candidate.slug===slug))invalidRelatedLinks.push([p.slug,slug]);
  for(const [,href] of ARTICLES[p.slug]?.resourceLinks||[]){const clean=href.split(/[?#]/)[0]||"/";if(!routes.has(clean)&&!clean.startsWith("/resources/"))invalidRelatedLinks.push([p.slug,href]);}
}
const duplicates=(key)=>Object.entries(POSTS.reduce((groups,post)=>{const value=(post[key]||"").trim().toLowerCase();if(value)(groups[value]??=[]).push(post.slug);return groups;},{})).filter(([,slugs])=>slugs.length>1);
const duplicateTitles=duplicates("title"),duplicateDescriptions=duplicates("description"),duplicatePrimaryKeywords=duplicates("primaryKeyword");
console.log(JSON.stringify({routes:routes.size,blogPosts:POSTS.length,broken,missingImages,missingArticles,invalidRelatedLinks,duplicateTitles,duplicateDescriptions,duplicatePrimaryKeywords},null,2));
if(broken.length||missingImages.length||missingArticles.length||invalidRelatedLinks.length||duplicateTitles.length||duplicateDescriptions.length||duplicatePrimaryKeywords.length)process.exitCode=1;
