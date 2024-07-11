import fetch from "node-fetch";
import fs from "fs/promises";

// https://www.backtowork.limo/644

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await fs.mkdir("out", { recursive: true });

  const baseUrl = "https://www.backtowork.limo/";
  const episodes = Array(644)
    .fill(0)
    .map((_, i) => ({
      url: `${baseUrl}${i + 1}`,
      path: `out/${i + 1}`,
      number: i + 1,
    }))
    .filter((_, i) => i !== 505);

  const titles = [];

  for (const episode of episodes) {
    const page = await fetch(episode.url);
    const text = await page.text();
    const title = text
      .match(/Back to Work Episode (.*)(?=<)/)![1]
      .replace(": ", " - ");
    titles.push(title);
    console.log(title);
    await sleep(300);
  }
  const alltitles = titles.join("\n");

  await fs.writeFile("titles.txt", alltitles);
}

main().catch((error) => console.log(error));

// Back to Work Episode 1: <
