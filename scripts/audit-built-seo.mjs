import fs from "node:fs";
import path from "node:path";
const rows=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.name.endsWith(".html")){const s=fs.readFileSync(f,"utf8");const title=s.match(/<title>(.*?)<\/title>/)?.[1]||"";const desc=s.match(/<meta name="description" content="([^"]*)"/)?.[1]||"";const canonical=s.match(/<link rel="canonical" href="([^"]*)"/)?.[1]||"";const h1=(s.match(/<h1(?:\s|>)/g)||[]).length;const robots=s.match(/<meta name="robots" content="([^"]*)"/)?.[1]||"";rows.push({file:f.replaceAll("\\","/"),title,desc,canonical,h1,robots});}}}
walk(".next/server/app");
const dup=(key)=>Object.entries(rows.reduce((o,r)=>{if(r[key])(o[r[key]]??=[]).push(r.file);return o;},{})).filter(([,v])=>v.length>1);
const issues=rows.filter(r=>{const systemPage=r.file.includes("_not-found")||r.file.includes("_global-error");const privatePage=/noindex/i.test(r.robots);return !r.title||(!r.desc&&!systemPage)||(!r.canonical&&!systemPage&&!privatePage)||r.h1!==1;});
console.log(JSON.stringify({htmlPages:rows.length,issues,duplicateTitles:dup("title"),duplicateDescriptions:dup("desc")},null,2));