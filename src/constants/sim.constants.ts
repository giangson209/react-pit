type Options = { id: string | number; name: string };
export const simTypes: Options[] = [
  { id: 1, name: 'Các số >= 6' },
  { id: 2, name: 'Số gánh' },
  { id: 3, name: 'Tam hoa' },
  { id: 4, name: 'Lộc phát' },
  { id: 5, name: 'Taxi' },
  { id: 6, name: 'Số lặp' },
  { id: 7, name: 'Tứ quý' },
  { id: 8, name: 'Sim 0 đồng' },
  { id: 9, name: 'Đặc biệt' }
  // { id: 10, name: 'Năm sinh' }
];

export const packs: Options[] = [
  { id: 'all', name: 'Tất cả' },
  { id: 1, name: 'iTel 149' },
  { id: 2, name: 'iTel 249' },
  { id: 3, name: 'iTel 77K' },
  { id: 4, name: 'iTel 49K' },
  { id: 5, name: 'iTel 7K' }
];

export const sorts: Array<{ id: string; name: string; property?: string; value?: string }> = [
  { id: 'all', name: 'Mặc định' },
  { id: '2', name: 'Giá từ cao đến thấp', property: 'price', value: 'asc' },
  { id: '3', name: 'Giá từ thấp đến cao', property: 'price', value: 'desc' },
  { id: '4', name: 'Sim ưu đãi xếp trước', property: 'sim', value: 'asc' }
];

export const MAX_PRICE = 5_000_000;
export const priceRange: Array<Options & { value: [number, number] }> = [
  { id: 'all', value: [0, MAX_PRICE], name: 'Mặc định' },
  { id: '2', value: [0, 100_000], name: 'Dưới 100k' },
  { id: '3', value: [100_000, 150_000], name: 'Từ 100k - 150k' },
  { id: '4', value: [151_000, 199_000], name: 'Từ 151k - 199k' },
  { id: '5', value: [200_000, 500_000], name: 'Từ 200k - 500k' },
  { id: '6', value: [501_000, 1_000_000], name: 'Từ 501k - 1 triệu' },
  { id: '7', value: [1_000_000, MAX_PRICE], name: 'Trên 1 triệu' }
];
export const searchTabs = [
  { id: 1, label: 'Sim Phong thủy' },
  { id: 2, label: 'Chấm điểm SIM' }
];

export enum SimQuery {
  Basic = '1',
  MarkPhone = '2'
}
