import { modal, useModal } from '@/context/modal-context';
import Routers from '@/routes/routers';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import ComboboxesSimple from '../comboboxes/comboboxes-simple';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import { toggleModalSelection } from './modal-selection';
import { withMobile } from '@/utilities/function';

export type Option = {
  id: number;
  name: string;
};

export const dataUsedOption: Array<Option> = [
  {
    id: 1,
    name: 'Từ 4GB/ ngày (~120GB/ tháng)'
  },
  {
    id: 2,
    name: 'Từ 2 đến dưới 4GB/ ngày (~60-120GB/ tháng)'
  },
  {
    id: 3,
    name: 'Từ 1 đến dưới 2GB/ ngày (~30-60GB/ tháng)'
  },
  {
    id: 4,
    name: 'Dưới 1GB/ ngày (~30GB/ tháng)'
  },
  {
    id: 5,
    name: 'Tôi không quan trọng số Data sử dụng'
  }
];

export const minutesAmountOption: Array<Option> = [
  {
    id: 1,
    name: 'Từ 30 phút/ ngày (~1000 phút/ tháng)'
  },
  {
    id: 2,
    name: 'Từ 15 phút/ ngày (~500 phút/ tháng)'
  },
  {
    id: 3,
    name: 'Tôi không quan trọng số phút gọi'
  }
];

export const priceUsedOption: Array<Option> = [
  {
    id: 1,
    name: 'Dưới 800/ ngày (~20.000/ tháng)'
  },
  {
    id: 2,
    name: 'Từ 800 đến dưới 1.600/ ngày (~20.000 - 50.000/ tháng)'
  },
  {
    id: 3,
    name: 'Từ 1.600 đến dưới 2.400/ ngày (~50.000 - 80.000/ tháng)'
  },
  {
    id: 4,
    name: 'Trên 2.400/ ngày (~80.000/ tháng)'
  }
];

export const ModalSuggestData = () => {
  const { done } = useModal();
  const [dataUsed, setDataUsed] = useState<Option>();
  const [minutesAmount, setMinutesAmount] = useState<Option>();
  const [price, setPrice] = useState<Option>();

  const isInvalid = !dataUsed || !minutesAmount || !price;

  function handleSubmit() {
    done({ data: dataUsed, minutes: minutesAmount, price });
  }

  const handleSelectData = withMobile(async () => {
    const v = await toggleModalSelection({
      title: 'Số Data sử dụng/ ngày',
      defaultValue: dataUsed,
      options: dataUsedOption
    }).catch(() => null);
    if (v) setDataUsed(v);
  });

  const handleSelectMinutes = withMobile(async () => {
    const v = await toggleModalSelection({
      title: 'Chọn số phút',
      defaultValue: minutesAmount,
      options: minutesAmountOption
    }).catch(() => null);
    if (v) setMinutesAmount(v);
  });

  const handleSelectPrice = withMobile(async () => {
    const v = await toggleModalSelection({
      title: 'Số tiền/ ngày',
      defaultValue: price,
      options: priceUsedOption
    }).catch(() => null);
    if (v) setPrice(v);
  });

  return (
    <div className="h-full flex flex-col">
      <HeaderMiddleAndFull title="Tìm gói cước cho riêng bạn" desc="Chia sẻ nhu cầu sử dụng để iTel tư vấn cho bạn nhé!" />
      <div className="mobile-container mt-2 md:mt-6 flex-1 pt-4 md:pt-0">
        <div className="md:hidden text-subtle-content">Chia sẻ nhu cầu sử dụng để iTel tư vấn cho bạn nhé!</div>
        <div className="mt-8 md:mt-0">
          <div className="space-y-3 md:space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Số Data sử dụng/ ngày</span>
              </label>
              <ComboboxesSimple
                onChange={setDataUsed}
                value={dataUsed}
                options={dataUsedOption}
                displayValue={(data) => data.name}
                disableInput
                placeholder="Chọn mức Data"
                onClick={handleSelectData}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Số phút gọi/ ngày</span>
              </label>
              <ComboboxesSimple
                onChange={setMinutesAmount}
                value={minutesAmount}
                options={minutesAmountOption}
                displayValue={(data) => data.name}
                disableInput
                placeholder="Chọn số phút"
                onClick={handleSelectMinutes}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Số tiền/ ngày</span>
              </label>
              <ComboboxesSimple
                value={price}
                onChange={setPrice}
                options={priceUsedOption}
                displayValue={(data) => data.name}
                disableInput
                placeholder="Chọn mức tiền"
                onClick={handleSelectPrice}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 pb-6 md:pb-0 bg-neutral-0">
        <div className="md:w-1/2 px-3 mx-auto">
          <button onClick={handleSubmit} type="button" className="btn btn-primary md:btn-lg rounded-full w-full" disabled={isInvalid}>
            Tra cứu
          </button>
        </div>
        <p className="mt-6 text-subtle-content text-center">
          <span className="max-md:block">Bạn chưa có Sim?</span>
          <Link href={Routers.SIM} className="text-red-500">
            <b> Mua Sim iTel </b>
          </Link>
          để trải nghiệm ngay nhé.
        </p>
      </div>
    </div>
  );
};

export function toggleModalDataSuggest(onDone?: (values: Record<'data' | 'minutes' | 'price', Option>) => void) {
  return modal.open({
    render: <ModalSuggestData />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    onDone
  });
}

export default ModalSuggestData;
