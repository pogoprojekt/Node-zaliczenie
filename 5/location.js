module.exports = function divideLocactionString(tekst) {
  const indexDot = tekst.indexOf(".");
  const indexComma = tekst.indexOf(",");

  if (indexDot !== -1) {
    return tekst.substring(0, indexDot);
  }

  if (indexComma !== -1) {
    return tekst.substring(0, indexComma);
  }

  return tekst;
};
