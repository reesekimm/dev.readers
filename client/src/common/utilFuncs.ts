export function truncateText(text: string): { result: string; more: boolean } {
  const lines = text.slice(0, 200).split('\n');
  let result = '';
  for (let index = 0; index < 3; index++) {
    if (lines[index]) {
      result += `${lines[index]}\n`;
    } else {
      break;
    }
  }
  return { result, more: lines.length > 3 };
}
