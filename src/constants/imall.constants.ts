export const IMALL_PRICE_LIST = [
  { id: 0, name: 'Giá mặc định' },
  { id: 1, name: 'Dưới 100k' },
  { id: 2, name: 'Từ 100k - 150k' },
  { id: 3, name: 'Từ 151k - 199k' },
  { id: 4, name: 'Từ 200k - 500k' },
  { id: 5, name: 'Từ 501k - 1 triệu' },
  { id: 6, name: 'Trên 1 triệu' }
];
export const IMALL_DEVICE_ATTRIBUTES = [
  {
    title: 'ROM',
    type: 'rom',
    options: [
      { value: 0, name: '256GB' },
      { value: 1, name: '128GB (Chọn nhiều)' },
      { value: 2, name: '64 GB' },
      { value: 3, name: '32GB' },
      { value: 4, name: '512GB' },
      { value: 5, name: '16GB' }
    ]
  },
  {
    title: 'RAM',
    type: 'ram',
    options: [
      { value: 0, name: '4GB' },
      { value: 1, name: '8GB (Chọn nhiều)' },
      { value: 2, name: '6GB' },
      { value: 3, name: '3 GB' },
      { value: 4, name: '2GB' }
    ]
  },
  {
    title: 'Camera sau',
    type: 'camera_behind',
    options: [
      { value: 0, name: '> 16MP' },
      { value: 1, name: '14MP - 16MP' },
      { value: 2, name: '11MP - 13MP' },
      { value: 3, name: '8MP - 10MP' },
      { value: 4, name: '<8MP' }
    ]
  },
  {
    title: 'Camera trước',
    type: 'camera_front',
    options: [
      { value: 0, name: '> 12MP' },
      { value: 1, name: '8MP - 12MP' },
      { value: 2, name: '5MP - 8MP' },
      { value: 3, name: '<8MP' }
    ]
  },
  {
    title: 'Màu sắc',
    type: 'color',
    options: [
      { value: 0, name: 'Xanh' },
      { value: 1, name: 'Đỏ' },
      { value: 2, name: 'Tím' },
      { value: 3, name: 'Vàng' },
      { value: 4, name: 'Nâu' },
      { value: 5, name: 'Đen' },
      { value: 6, name: 'Trắng' },
      { value: 7, name: 'Hồng' }
    ]
  }
];
