const fs = require("fs");

const addTaskToFile = async (data) => {
  try {
    await fs.promises.appendFile("lista.txt", data + "\n", { encoding: "utf-8" });
    return console.log("Zadanie dodane poprawnie.");
  } catch (error) {
    throw new Error("Błąd podczas zapisu zadania do pliku.");
  }
};

module.exports = addTaskToFile;
