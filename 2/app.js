// Napisz aplikację która przyjmuje w parametrze uruchamiania ciąg znaków a następnie wyświetli go w kolorach tęczy. Wykorzystaj moduł `colors`
//(https://www.npmjs.com/package/colors) w wersji 1.3.2!. Pamiętaj o obsłudze błędów.

//     Sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).

// prykładowe wywołanie: node app.js --text=Tekst

const request = require("colors");
const argv = require("yargs").argv;
const isSpaceInText = process.argv[3];

const text = String(argv.text);
if (text === "") {
  console.log("Nie wpisałeś tekstu");
} else if (isSpaceInText !== undefined) {
  console.log(text.rainbow);
  console.log(
    "Podaj ciąg znaków. W innym przypadku tylko tekst przed spacją zostanie wyświetlony w kolorach tęczy"
  );
} else console.log(text.rainbow);
