// Napisz aplikację która odczyta z pliku `data.json` liczbę oraz nazwę pliku, a następnie:
//     - pobierze z API informacje o danej liczbie (https://lukaszuk.net/numbers.php?number={number}, np https://lukaszuk.net/numbers.php?number=1)
//     - informacje pobrane z API zapisze w pliku o pobranej wcześniej nazwie

//     Przykład pliku: data.json
//     ``` JSON
//     {
//         "number": "588",
//         "filename": "file.json"
//     }
//     ```

//     Pamiętaj o obsłudze błędów. Żądania do API oraz zapis do pliku wykonuj asynchronicznie.

const axios = require("axios");
const fs = require("fs");
const file = "data.json";

function isCorrectFilename(filename) {
  const invalidChars = /[\ /:*?"<>|]/;
  if (invalidChars.test(filename)) {
    return false;
  }

  if (filename.length > 250) {
    return false;
  }

  return true;
}

const getdataFromURL = async (number) => {
  const url = `https://lukaszuk.net/numbers.php?number=${number}`;
  const response = await axios.get(url);
  return response.data;
};

const datafromJSON = JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }));
console.log(datafromJSON);

if (!(datafromJSON.number && datafromJSON.filename)) {
  throw new Error("Błąd parametrów. Sprawdź poprawność parametrów w pliku.");
}

if (!isCorrectFilename(datafromJSON.filename)) {
  throw new Error("Niepoprawna nazwa pliku.");
}

(async () => {
  try {
    const messageFromUrl = await getdataFromURL(datafromJSON.number);
    console.log(messageFromUrl);
    fs.writeFile(datafromJSON.filename + ".txt", messageFromUrl, (error) => {
      if (error) {
        console.log("Błąd zapisu do pliku");
      } else {
        console.log("Plik został zapisany");
      }
    });
  } catch (error) {
    console.log("Błąd pobrania danych z serwera");
  }
})();
