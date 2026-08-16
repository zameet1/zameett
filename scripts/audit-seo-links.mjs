import fs from "node:fs";
import path from "node:path";
import { POSTS } from "../src/app/blog/posts.js";
import { GIGS } from "../src/app/services/gigs.js";
import { SOLUTIONS } from "../src/app/solutions/solutions.js";
import { PRODUCTS } from "../src/app/shop/products.js";
const base=["/","/about","/services","/how-it-works","/pricing","/supply-chain","/portfolio","/shop","/contact","/faq","/blog","/privacy","/terms","/legal","/cookie-policy","/digital-product-licence","/digital-product-refund","/disclaimer","/intellectual-property","/manufacturing-terms","/refund-cancellation","/revision-policy","/sampling-policy","/shipping-delivery","/sign-in","/account","/admin","/reset-password","/resources/fashion-development-brief-checklist.pdf"];
const routes=new Set([...base,...POSTS.map(p=>"/blog/"+p.slug),...GIGS.map(p=>"/services/"+p.slug),...SOLUTIONS.map(p=>"/solutions/"+p.slug),...PRODUCTS.map(p=>"/shop/"+p.slug)]);
const broken=[],missingImages=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(/\.(js|jsx)$/.test(e.name)){const s=fs.readFileSync(f,"utf8");for(const m of s.matchAll(/(?:href|serviceHref)\s*[:=]\s*"([^"]+)"/g)){const raw=m[1];if(!raw.startsWith("/")||raw.includes("$"+"{")||raw.startsWith("/api/"))continue;const clean=raw.split(/[?#]/)[0]||"/";if(!routes.has(clean)&&!clean.startsWith("/shop/")&&!clean.startsWith("/resources/"))broken.push([f,raw]);}}}}
walk("src");
for(const p of POSTS)if(!fs.existsSync(path.join("public",p.image)))missingImages.push([p.slug,p.image]);
console.log(JSON.stringify({routes:routes.size,blogPosts:POSTS.length,broken,missingImages},null,2));
if(broken.length||missingImages.length)process.exitCode=1;