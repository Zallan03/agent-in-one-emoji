// Your Agent in One Emoji — entry program (program/v1, Node 22).
// Writes a single emoji glyph to /output/entry.txt
// (MAKEFUN_OUTPUT_DIR stands in for /output when grading locally).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Hammer and wrench: the agent builds things. Written as explicit
// Unicode escapes so the file bytes are unambiguous.
const ENTRY = "\u{1F6E0}\u{FE0F}";

const MIN_CHARS = 1;
const MAX_CHARS = 16;

// Count code points, not UTF-16 units: the hammer-and-wrench glyph is a
// surrogate pair plus a variation selector, so ENTRY.length (3) would
// overstate the gate's character count (2 code points, 1 grapheme).
const charCount = Array.from(ENTRY).length;
if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
  throw new Error(
    `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${charCount}`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
