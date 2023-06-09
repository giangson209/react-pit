export const datas = [
  { id: 'all', name: 'Tất cả dung lượng' },
  { id: '1', name: 'Từ 4GB/ ngày' },
  { id: '2', name: 'Từ 2-4GB/ ngày' },
  { id: '3', name: 'Từ 1-2GB/ ngày' },
  { id: '4', name: 'Dưới 1GB/ ngày' }
];
export const sorts: Array<{ id: string; name: string; property?: string; value?: string }> = [
  { id: 'all', name: 'Mặc định' },
  { id: '2', name: 'Giá từ cao đến thấp', property: 'price', value: 'asc' },
  { id: '3', name: 'Giá từ thấp đến cao', property: 'price', value: 'desc' }
];
