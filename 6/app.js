// Napisz aplikację pozwalającą na przechowywanie w pliku listy zadań do wykonania (klasyczna lista TODO).
// Aplikacja powinna pozwalać na dodanie do listy nowego zadania, jak również wyświetlić zawartość całej listy.
// Przy uruchomieniu bez parametrów aplikacja powinna informować o możliwych parametrach wywołania.

//     - zapis/odczyt wykonuj asynchronicznie
//     - pamiętaj o obsłudze błędów
//     - poinformuj użytkownika o poprawności wykonanych operacji
//     - wydziel odczyt i zapis informacji do osobnych modułów

//     Sugeruje użyć modułu `yargs` z konstrukcją `yargs.command`.

//     Przykład wywołania programu:
//     ```bash
//     > node app.js dodaj "napisac program na zaliczenie z NodeJS"
//     ```

//     ```bash
//     > node app.js lista
//     ```

const yargs = require("yargs");
const fs = require("fs");
const showTask = require("./listoftask.js");
const addTask = require("./addtask.js");

yargs
  .usage("Użycie: $0 <komenda: wymagana> [opis: opcjonalny]")

  .command(
    "dodaj <zadanie>",
    'Instrukcja dodawania zadań do pliku "<zadanie>" - wymagane do wpisania',
    () => {},
    async (argv) => {
      if (!/[a-zA-Z]/.test(argv.zadanie)) {
        console.error("Wymień konkretne zadanie do wykonania.");
        process.exit(1);
      }
      await addTask(argv.zadanie);
    }
  )
  .command(
    "lista",
    "Pokaże listę zadań do wykonania",
    () => {},
    async () => {
      fs.exists("lista.txt", (exists) => {
        if (!exists) {
          throw new Error("Brak listy do pokazania");
        }
      });
      await showTask("lista.txt");
    }
  )
  .demandCommand().argv;
