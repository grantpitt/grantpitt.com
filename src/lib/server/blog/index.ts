import fs from "fs";
import { transform } from "./marked";

type BlogPostSummary = {
  slug: string;
  formatedDate: string;
  date: string;
  title: string;
  description: string;
};

export async function getBlogIndex() {
  const directory = await fs.promises.readdir("src/content/blog");
  const index = (
    await Promise.all(
      directory.map(async (filename) => {
        if (!filename.endsWith(".md")) return;

        const content = await fs.promises.readFile(`src/content/blog/${filename}`, "utf-8");
        const { metadata } = extractFrontmatter(content);
        const slug = filename.replace(/\.md$/, "");
        const formatedDate = formatDate(metadata.date);

        return {
          slug,
          formatedDate,
          date: metadata.date,
          title: metadata.title,
          description: metadata.description,
        };
      })
    )
  )
    .filter((item): item is BlogPostSummary => !!item)
    .sort((item1, item2) => item2.date.localeCompare(item1.date));

  return index;
}

export async function getPost(slug: string) {
  for (const filename of fs.readdirSync("src/content/blog")) {
    if (!filename.endsWith(".md")) continue;
    if (filename.slice(0, -3) !== slug) continue;

    const content = await fs.promises.readFile(`src/content/blog/${filename}`, "utf-8");
    const { metadata, body } = extractFrontmatter(content);
    const formatedDate = formatDate(metadata.date);

    return {
      formatedDate,
      date: metadata.date,
      title: metadata.title,
      description: metadata.description,
      content: transform(body),
    };
  }
}

function extractFrontmatter(markdown: string) {
  const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown) as RegExpExecArray;
  const frontmatter = match[1];
  const body = markdown.slice(match[0].length);

  const metadata: Record<string, string> = {};
  frontmatter.split("\n").forEach((pair) => {
    const i = pair.indexOf(":");
    metadata[pair.slice(0, i).trim()] = stripQuotes(pair.slice(i + 1).trim());
  });

  return { metadata, body };
}

function stripQuotes(str: string) {
  if (str[0] === '"' && str[str.length - 1] === '"') return str.slice(1, -1);
  return str;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
}
