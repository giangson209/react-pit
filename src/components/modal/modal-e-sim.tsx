import { useState } from 'react';
import Tab from '../tabs/tabs';
import Svg from '../icon/svg';
import Modal from './modal';
import { useModal } from '@/context/modal-context';

const iphoneType = [
  { id: 1, label: 'iPhone XR (mẫu A2105, từ 2018)' },
  { id: 2, label: 'iPhone XS (mẫu A2097, từ 2018)' },
  { id: 3, label: 'iPhone XS Max (mẫu A2101, từ2018)' },
  { id: 4, label: 'iPhone 11 (mẫu A2221, từ 2019)' },
  { id: 5, label: 'iPhone 11 Pro (mẫu A2215, từ 2019)' },
  { id: 6, label: 'iPhone 11 Pro Max - iPhone SE (mẫul 2020)' },
  { id: 7, label: 'iPhone 12/ 12mini/ 12 Pro/ 12 Pro Max' },
  { id: 8, label: 'iPhone 13/ 13 mini/ 13 Pro/ 13 Pro Max' },
  { id: 9, label: 'iPhone SE (2022)- iPhone 14/ 14 Plus/ 14 Pro/ 14 Pro Max' }
];

const ipadType = [
  { id: 1, label: 'iPad Pro LTE (2018)' },
  { id: 2, label: 'iPad Pro 11″ (mẫu A2068, từ 2020)/ iPad Pro 11 (2021, 2020)' },
  { id: 3, label: 'iPad Pro 12.9″ (mẫu A2069, từ 2020)/ iPad Pro 12.9 (2021, 2020, 2017, 2015) / Apple iPad Pro 12.9 (2021, 2018)' },
  { id: 4, label: 'iPad Air (mẫu A2123, từ 2019)/ iPad Air (2022, 2020)' },
  { id: 5, label: 'iPad (mẫu A2198, từ 2019)' },
  { id: 6, label: 'iPad Mini (mẫu A2124, từ 2019)/ iPad mini (2021, 2019)/ iPad mini 3' },
  { id: 7, label: 'iPad 10.2 (2021, 2020, 2019)' },
  { id: 8, label: 'iPad 9.7 (2016)' }
];

type ModalESimProps = {};

const ModalESim = (props: ModalESimProps) => {
  const { close, done } = useModal();
  const [tabName, setTabName] = useState<string>('Apple');
  return (
    <div>
      <header className="md:hidden sticky w-full top-0 bg-neutral-0 py-2 z-10">
        <div className="flex px-2">
          <button type="button" className="btn btn-circle btn-ghost bg-neutral-100" onClick={close}>
            <Svg src="/icons/line/close.svg" width={24} height={24} />
          </button>
        </div>
      </header>
      <div className="max-md:hidden absolute top-8 right-8">
        <button
          className="btn-tertiary btn btn-circle fixed md:static right-8 z-50 md:bg-neutral-100 xl:bg-neutral-0 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <div className="space-y-8 container md:px-0 pt-6 pb-20 md:py-0">
        <Modal.Heading
          title="Xác nhận chọn eSim"
          desc="Bằng việc bấm xác nhận, bạn xác nhận đã hiểu đặc điểm và nắm được các dòng máy hỗ trợ sản phẩm eSim."
        />
        <div>
          <div className="flex flex-col gap-4">
            <p className="text-base font-medium text-neutral-500">Các dòng máy hỗ trợ esim</p>
            <div className="flex items-center justify-between overflow-auto border-b border-b-neutral-300 scrollbar-hide">
              {['Apple', 'Google', 'Oppo', 'Samsung', 'Khác'].map((item, index) => (
                <Tab key={`tab-${index}`} label={item} size="small" onClick={() => setTabName(item)} isActive={item == tabName} />
              ))}
            </div>
          </div>
          <div className="md:max-h-80 gap-4 overflow-auto">
            <div className="pt-2">
              <p className="py-2 text-sm">
                <b>Các dòng máy iPhone</b>
              </p>
              <ul className="mt-1 list-inside list-disc text-subtle-content">
                {iphoneType.map((item) => {
                  return <li key={item.id}>{item.label}</li>;
                })}
              </ul>
            </div>
            <div>
              <p className="py-2 text-sm">
                <b>Các dòng máy iPad</b>
              </p>
              <ul className="mt-1 list-inside list-disc text-subtle-content">
                {ipadType.map((item) => {
                  return <li key={item.id}>{item.label}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <Modal.ModalActions className="flex gap-4 fixed md:relative left-0 right-0 px-4 border-t border-neutral-200 md:border-none md:p-0 py-3 bottom-0 bg-neutral-0">
          <button type="button" className="btn-secondary btn btn-md w-1/2 rounded-full" onClick={close}>
            Không chọn
          </button>
          <button type="button" className="btn-primary btn btn-md w-1/2 rounded-full" onClick={done}>
            Xác nhận
          </button>
        </Modal.ModalActions>
      </div>
    </div>
  );
};

export default ModalESim;
