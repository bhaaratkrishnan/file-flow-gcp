export function copyToClipboard(text:string) {
  if (process.client) {
    navigator.clipboard.writeText(text);
  }
}
