import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const bytes = await readFile(
    path.join(
      process.cwd(),
      "private-resources",
      "fashion-development-brief-checklist.pdf",
    ),
  );

  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Zameett-Fashion-Product-Development-Brief-Checklist.pdf"',
      "Content-Length": String(bytes.length),
      "Cache-Control": "no-store",
      Link: '<https://zameett.com/resources/fashion-development-brief-checklist>; rel="canonical"',
    },
  });
}
