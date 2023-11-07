export function copyToClipboard(text) {
  // Create a textarea element to temporarily hold the text
  navigator.clipboard.writeText(text);
}
