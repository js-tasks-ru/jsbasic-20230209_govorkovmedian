function checkSpam(str) {
  // ваш код...
  let tmpStr = str.toLowerCase(),
    bool = tmpStr.includes('1xBet'.toLowerCase()) || tmpStr.includes('XXX'.toLowerCase());

  return bool;
}
