import { ImageService } from '../../image/image';
import { Data, Model } from '@/types/model';

const getListXu = (): Promise<Data.IzuiCheckinList> => {
  const res: Model.IzuiCheckin[] = [
    {
      id: 1,
      title: 'Hôm nay',
      img: ImageService.random('artworks'),
      value: 50,
      state: 1
    },
    {
      id: 2,
      title: 'Ngày 2',
      img: ImageService.random('artworks'),
      value: 50,
      state: 0
    },
    {
      id: 3,
      title: 'Ngày 3',
      img: ImageService.random('artworks'),
      value: 50,
      state: 0
    },
    {
      id: 4,
      title: 'Ngày 4',
      img: ImageService.random('artworks'),
      value: 50,
      state: 0
    },
    {
      id: 1,
      title: 'Ngày 5',
      img: ImageService.random('artworks'),
      value: 50,
      state: 0
    },
    {
      id: 5,
      title: 'Ngày 6',
      img: ImageService.random('artworks'),
      value: 50,
      state: 0
    },
    {
      id: 6,
      title: 'Ngày 7',
      img: ImageService.random('artworks'),
      value: 50,
      state: 0
    }
  ];
  return Promise.resolve({ data: res });
};

const getListGifts = (): Promise<Data.IzuiCheckinListGift> => {
  const res: Model.IzuiGift[] = [
    {
      id: 1,
      title: 'iTel tặng bạn 100 Vé CGV miễn phí. Săn ngay',
      img: '/iwow/izui-gift.png',
      time: '9h - 11h 25/6/2023',
      logo: '/icons/others/cgv.svg'
    },
    {
      id: 2,
      title: 'iTel tặng bạn 100 Vé CGV miễn phí. Săn ngay',
      img: '/iwow/izui-gift.png',
      time: '9h - 11h 25/6/2023',
      logo: '/icons/others/cgv.svg'
    }
  ];
  return Promise.resolve({ data: res });
};

const IwowIzuiServices = { getListXu, getListGifts };

export default IwowIzuiServices;
