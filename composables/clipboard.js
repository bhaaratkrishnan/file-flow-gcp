export function copyToClipboard(text) {
  if (process.client) {
    navigator.clipboard.writeText(text);
  }
}
