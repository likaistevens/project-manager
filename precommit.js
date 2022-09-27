// import fs from "fs";
// import chalk from "chalk";
// import { fileURLToPath } from "url";

// function precommit() {
//   const files = process.argv;
//   const __filename = fileURLToPath(import.meta.url);

//   files
//     .filter((f) => f !== __filename)
//     .forEach((f) => {
//       const res = fs.readFileSync(f, { encoding: "utf-8" });
//       if (/byted/.test(res) || /bnpm/.test(res) || /feishu/.test(res)) {
//         console.log(chalk.blue.bgRed.bold(`Sensitive Words Found in ${f}`));
//         process.exit(1);
//       }
//     });
// }
// precommit();

const fs = require("fs");
const chalk = require("chalk");

function precommit() {
  const files = process.argv;
  files
    .filter((f) => f !== __filename)
    .forEach((f) => {
      fs.readFile(f, { encoding: "utf-8" }, (err, res) => {
        if (/byted/.test(res) || /bnpm/.test(res) || /feishu/.test(res)) {
          console.log(chalk.blue.bgRed.bold(`Sensitive Words Found in ${f}`));
          process.exit(1);
        }
      });
    });
}
precommit();
