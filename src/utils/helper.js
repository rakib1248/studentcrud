export function generate6DigitCode() {
  return String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
}
