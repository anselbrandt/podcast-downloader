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

  for (const episode of episodes) {
    const page = await fetch(episode.url);
    const text = await page.text();
    const mediaUrl = text.match(/source src="(.*)(?=\" type)/)![1];
    console.log("downloading episode", episode.number);
    const response = await fetch(mediaUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(episode.path + ".mp3", buffer);
    await sleep(300);
  }
}

main().catch((error) => console.log(error));
