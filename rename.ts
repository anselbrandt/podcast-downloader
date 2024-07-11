import fs from "fs/promises";
import { filenames } from "./filenames";

async function main() {
  const files = await fs.readdir("out");

  const sorted = files
    .sort(
      (a, b) => parseInt(a.replace(".mp3", "")) - parseInt(b.replace("mp3", ""))
    )
    .filter((file) => file !== ".DS_Store");

  for (const i in sorted) {
    await fs.rename("out/" + sorted[i], "out/" + filenames[i]);
  }
}

main().catch((error) => console.log(error));
