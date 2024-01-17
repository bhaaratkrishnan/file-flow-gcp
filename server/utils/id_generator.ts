const shortUrlIdLength = 5;

export function generateShortUrlId() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789"; // Lowercase alphanumeric characters
  let result = "";
  for (let i = 0; i < shortUrlIdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

