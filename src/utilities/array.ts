type ItemComparer<T> = (a: T, b: T) => boolean;

export function areArraysEqual<T>(array1: T[], array2: T[], itemComparer: ItemComparer<T> = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}
export function chunkArray<T>(arr: T[], n: number) {
  var chunkLength = Math.max(arr.length / n, 1);
  var chunks = [];
  for (var i = 0; i < n; i++) {
    if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
}
