// Napisz program który wypisze szczegóły pliku z własnym kodem źródłowym.

//     Wypisywane informacje:
//     - czas utworzenia
//     - czas modyfikacji
//     - rozmiar

//     Program powinien działać poprawnie także po zmianie nazwy i lokalizacji pliku - bez zmiany kodu źródłowego!

const fs = require("fs");

const control = process.argv[1];

fs.stat(String(control), (error, stats) => {
  if (error) {
    console.log("Błąd odczytu pliku");
  } else {
    console.log("Czas utworzenia: " + stats.birthtime);
    console.log("Czas modyfikacji: " + stats.mtime);
    console.log("Rozmiar: " + stats.size + "b");
  }
});
