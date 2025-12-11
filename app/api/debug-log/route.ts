import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LOG_PATH = path.join(process.cwd(), ".cursor", "debug.log");

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const line = `${JSON.stringify(payload)}\n`;
    await fs.mkdir(path.dirname(LOG_PATH), { recursive: true });
    await fs.appendFile(LOG_PATH, line, "utf8");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("debug-log append error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
