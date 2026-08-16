import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const buildRoot = path.join(projectRoot, ".next");
const standaloneRoot = path.join(buildRoot, "standalone");
const standaloneServer = path.join(standaloneRoot, "server.js");
const standaloneCompiled = path.join(
  standaloneRoot,
  "node_modules/next/dist/compiled",
);
const sourceCompiled = path.join(projectRoot, "node_modules/next/dist/compiled");
const runtimeBuildRoot = path.join(buildRoot, ".next");
const hostingerServer = path.join(projectRoot, "scripts", "hostinger-server.cjs");

await access(standaloneServer);
await access(hostingerServer);

await cp(sourceCompiled, standaloneCompiled, {
  recursive: true,
  force: true,
});

// Hostinger deploys the configured `.next` output directory as its Node runtime
// root and starts `/nodejs/server.js`. Promote Next's standalone runtime there.
await cp(standaloneRoot, buildRoot, {
  recursive: true,
  force: true,
});

await cp(hostingerServer, standaloneServer, { force: true });
await cp(hostingerServer, path.join(buildRoot, "server.js"), { force: true });

await mkdir(runtimeBuildRoot, { recursive: true });
await cp(path.join(buildRoot, "static"), path.join(runtimeBuildRoot, "static"), {
  recursive: true,
  force: true,
});

await cp(path.join(projectRoot, "public"), path.join(buildRoot, "public"), {
  recursive: true,
  force: true,
});

// Hostinger's manual archive deployments do not always persist dashboard
// variables. Keep a deployment-only environment file beside the runtime when
// one is supplied; it is never served from the public directory.
const productionEnv = path.join(projectRoot, ".env.production.local");
const runtimeVariables = [
  "NEXT_PUBLIC_VAPID_PUBLIC_KEY",
  "VAPID_PRIVATE_KEY",
  "VAPID_SUBJECT",
];
try {
  await access(productionEnv);
  await cp(productionEnv, path.join(buildRoot, ".env.production.local"), { force: true });
} catch {
  // Dashboard environment variables remain the preferred fallback.
}

let fileVariables = {};
try {
  const envText = (await readFile(productionEnv, "utf8")).replace(/^\uFEFF/, "");
  fileVariables = Object.fromEntries(
    envText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const name = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim().replace(/^(["'])(.*)\1$/, "$2");
        return [name, value];
      }),
  );
} catch {
  // Runtime variables may still come from the Hostinger dashboard.
}
const runtimeAssignments = runtimeVariables
  .map((name) => [name, process.env[name] || fileVariables[name]])
  .filter(([, value]) => value)
  .map(([name, value]) => `process.env[${JSON.stringify(name)}] ||= ${JSON.stringify(value)};`);
if (runtimeAssignments.length) {
  await writeFile(
    path.join(buildRoot, "runtime-env.cjs"),
    `${runtimeAssignments.join("\n")}\n`,
    { encoding: "utf8", mode: 0o600 },
  );
}

console.log(`Hostinger serialized-config Passenger runtime prepared (${runtimeAssignments.length} private runtime variables)`);
