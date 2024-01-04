const fs = require("fs");

const readFile = async (file) => {
  let fileData;
  try {
    fileData = await fs.promises.readFile(file, { encoding: "utf-8" });
  } catch (error) {
    throw new Error("Błąd odczytu pliku");
  }

  return console.log(fileData);
};

module.exports = readFile;
