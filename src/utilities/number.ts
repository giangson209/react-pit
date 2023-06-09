export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}
export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}
export function roundValueToStep(value: number, step: number, min: number): number {
  const nearest = Math.round((value - min) / step) * step + min;
  return nearest;
}
export function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}
export function randomBetween(from: number, to: number) {
  const diff = to - from;

  return from + Math.floor(Math.random() * diff);
}

export function formatNumber(number: number, suffixes = ['', 'k', 'tr']) {
  if (!number) return '0' + suffixes[0];
  // const suffixes = ['', 'k', 'tr']; // Suffixes for thousand, million, billion, trillion, ...
  const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3); // Tính chỉ số đơn vị (k, M, G, ...)
  const abbreviatedNumber = number / Math.pow(1000, suffixIndex); // Giá trị số sau khi đã được rút gọn
  const formattedNumber = abbreviatedNumber.toLocaleString('vi') + suffixes[suffixIndex]; // Số đã được định dạng với số thập phân và đơn vị
  return formattedNumber;
}

export function getDiscountPercentage(discountPercentage: number | boolean | undefined, price: number, discountPrice?: number) {
  return discountPercentage == true && discountPrice ? Math.floor(((price - discountPrice) / price) * 100) : discountPercentage;
}
