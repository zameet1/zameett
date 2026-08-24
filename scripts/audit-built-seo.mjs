import fs from "node:fs";
import path from "node:path";
const rows=[];
const invalidJsonLd=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.name.endsWith(".html")){const s=fs.readFileSync(f,"utf8");const title=s.match(/<title>(.*?)<\/title>/)?.[1]||"";const desc=s.match(/<meta name="description" content="([^"]*)"/)?.[1]||"";const canonical=s.match(/<link rel="canonical" href="([^"]*)"/)?.[1]||"";const ogUrl=s.match(/<meta property="og:url" content="([^"]*)"/)?.[1]||"";const twitterTitle=s.match(/<meta name="twitter:title" content="([^"]*)"/)?.[1]||"";const h1=(s.match(/<h1(?:\s|>)/g)||[]).length;const robots=s.match(/<meta name="robots" content="([^"]*)"/)?.[1]||"";const jsonLd=[...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match)=>match[1]);for(const value of jsonLd){try{JSON.parse(value);}catch(error){invalidJsonLd.push({file:f.replaceAll("\\","/"),error:error.message});}}rows.push({file:f.replaceAll("\\","/"),title,desc,canonical,ogUrl,twitterTitle,h1,robots,jsonLd:jsonLd.length});}}}
walk(".next/server/app");
const dup=(key)=>Object.entries(rows.reduce((o,r)=>{if(r[key])(o[r[key]]??=[]).push(r.file);return o;},{})).filter(([,v])=>v.length>1);
const issues=rows.filter(r=>{const systemPage=r.file.includes("_not-found")||r.file.includes("_global-error");const privatePage=/noindex/i.test(r.robots);return !r.title||(!r.desc&&!systemPage)||(!r.canonical&&!systemPage&&!privatePage)||r.h1!==1;});
const socialMismatches=rows.filter(r=>r.canonical&&r.ogUrl&&r.canonical!==r.ogUrl).map(({file,canonical,ogUrl})=>({file,canonical,ogUrl}));
const genericTwitterTitle="Zameett | Fashion Design &amp; Product Development";
const missingOrInheritedSocial=rows.filter(r=>r.canonical&&!/noindex/i.test(r.robots)&&(r.canonical!=="https://zameett.com"||r.twitterTitle!==genericTwitterTitle)&&(!r.ogUrl||!r.twitterTitle||r.twitterTitle===genericTwitterTitle)).map(({file,canonical,ogUrl,twitterTitle})=>({file,canonical,ogUrl,twitterTitle}));
const duplicateTitles=dup("title"),duplicateDescriptions=dup("desc"),duplicateCanonicals=dup("canonical");
console.log(JSON.stringify({htmlPages:rows.length,issues,socialMismatches,missingOrInheritedSocial,invalidJsonLd,duplicateTitles,duplicateDescriptions,duplicateCanonicals},null,2));
if(issues.length||socialMismatches.length||missingOrInheritedSocial.length||invalidJsonLd.length||duplicateTitles.length||duplicateDescriptions.length||duplicateCanonicals.length)process.exitCode=1;
