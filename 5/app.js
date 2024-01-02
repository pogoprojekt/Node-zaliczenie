// Stwórz aplikację która pobierze z GitHuba informacje o użytkowniku i jego repozytoriach. Dodatkowo sprawdź aktualną pogodę w lokalizacji użytkownika.
//     - w parametrach uruchomienia jest podawany login użytkownika oraz opcjonalnie informacja czy wyświetlać liczbę śledzących użytkownika, sposób obsługi parametrów
//wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).
//     - wyświetl nazwę użytkownika (`name`)
//     - wyświetl liczbę śledzących użytkownika (`followers`) - tylko jeżeli użyto odpowiedniego parametru przy uruchomieniu aplikacji
//     - wyświetl liczbę repozytoriów
//     - wyświetl nazwy repozytoriów (`name`)
//     - wyświetl opis pogody (`weather.main`, `weather.description`) w lokalizacji użytkownika (`location` - zwraca GitHub w danych użytkownika)
//     - żądania do API wysyłaj asynchronicznie
//     - pamiętaj o obsłudze błędów
//     - podziel rozwiązanie na moduły

//     Lista endpointów API:
//     - dane użytkownika: https://api.github.com/users/{userName}
//         - np https://api.github.com/users/octocat
//     - repozytoria użytkownika: https://api.github.com/users/{username}/repos
//         - np https://api.github.com/users/octocat/repos
//     - pogoda: https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q={name}
//         - np https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=Białystok

// Wywołanie node app.js --GitHubuser=mzabriskie --followers=true
const argv = require("yargs").argv;
const locationRemove = require("./location.js");
const getdataFromGitURL = require("./userinfo.js");
const getrepoFromGitURL = require("./repolist.js");
const getweatherFromURL = require("./weather.js");

(async () => {
  try {
    const userInfoFromUrl = await getdataFromGitURL(argv.GitHubuser);
    if (userInfoFromUrl.name === null) {
      console.log("Użytkownik nie podał imienia");
    } else console.log("Imię: " + userInfoFromUrl.name);
    if (userInfoFromUrl.location === null) {
      console.log("Użytkownik nie podał lokalizacji");
    } else console.log("Lokalizacja: " + userInfoFromUrl.location);
    if (argv.followers === "true") {
      console.log("Followers: " + userInfoFromUrl.followers);
    }
    console.log("Repozytoria: " + userInfoFromUrl.public_repos);

    if (userInfoFromUrl.location === null) {
      console.log(
        "Ze względu na brak określenia lokalizacji nie można podać pogody"
      );
    } else {
      try {
        const location = locationRemove(userInfoFromUrl.location);
        const weatherFromUrl = await getweatherFromURL(location);
        console.log(
          "Pogoda: " +
            weatherFromUrl.weather[0].main +
            ", " +
            weatherFromUrl.weather[0].description
        );
      } catch (error) {
        console.log("Błąd pobrania pogody");
      }
    }

    try {
      const messageFromUrl = await getrepoFromGitURL(argv.GitHubuser);

      const repo = [];
      for (i = 0; i < messageFromUrl.length; i++) {
        repo.push(messageFromUrl[i].name);
      }
      console.log("Nazwy repozytoriów:\n" + repo);
    } catch (error) {
      console.log("Błąd pobrania danych repozytorium");
    }
  } catch (error) {
    console.log("Użytkownik Github nie istnieje");
  }
})();
