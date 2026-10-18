// Markdown + KaTeX. Math is pulled out before Markdown runs, so `_`, `*`
// and `\\` inside formulas are never touched by the Markdown parser.

const MATH = /\$\$([\s\S]+?)\$\$|\$((?:\\\$|[^$\n])+?)\$/g;

export function tex(src, display = false) {
  return katex.renderToString(String(src), { displayMode: display, throwOnError: false, strict: false });
}

function protect(src) {
  const parts = [];
  const text = String(src ?? '').replace(MATH, (_, block, inline) => {
    parts.push(block !== undefined ? tex(block.trim(), true) : tex(inline, false));
    return `@@M${parts.length - 1}@@`;
  });
  return [text, parts];
}

const restore = (html, parts) => html.replace(/@@M(\d+)@@/g, (_, n) => parts[+n]);

// Block Markdown (paragraphs, lists, quotes) with math.
export function md(src) {
  const [text, parts] = protect(src);
  return restore(marked.parse(text), parts);
}

// Single-line Markdown with math (option labels, titles).
export function mdInline(src) {
  const [text, parts] = protect(src);
  return restore(marked.parseInline(text), parts);
}
