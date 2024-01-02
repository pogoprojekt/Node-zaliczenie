const fs = require("fs").promises;

const readFile = async (file) => {
  let fileData;
  try {
    fileData = await fs.readFile(file, { encoding: "utf-8" });
  } catch (error) {
    throw new Error("Błąd odczytu pliku");
  }

  return console.log(fileData);
};

module.exports = readFile;
