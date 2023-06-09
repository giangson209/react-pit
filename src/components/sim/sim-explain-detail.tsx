import { simNumberTypeList } from '@/utilities/formatSimNumber';
import ButtonCommit from '../button/button-commit';
import ButtonGift from '../button/button-gift';
import ButtonInformation from '../button/button-information';
import Svg from '../icon/svg';
import FlashSaleTimer from '../FlashSaleTimer/FlashSaleTimer';
import { useState } from 'react';

type SimExplainDetailProps = {
  close?: () => void;
  point: number;
  status: string;
};

const giftBonus = [
  { id: 1, image: '/images/gift-bonus.png', name: 'Tai nghe không dây chụp tai...', price: '0', oldPrice: '990.000' },
  { id: 2, image: '/images/gift-bonus.png', name: 'Tai nghe không dây chụp tai...', price: '0', oldPrice: '990.000' },
  { id: 3, image: '/images/gift-bonus.png', name: 'Tai nghe không dây chụp tai...', price: '0', oldPrice: '990.000' }
];

const SimExplainDetail = ({ close, point, status }: SimExplainDetailProps) => {
  const [giftId, setGiftId] = useState<number>(1);

  return (
    <div className="fixed inset-0 bg-overlay-popup/[.5] z-50 h-screen w-full flex flex-col">
      <div className="w-full h-full md:h-[90%] xl:bg-neutral-100 bg-neutral-0 md:rounded-t-3xl absolute inset-x-0 bottom-0 ">
        <div className="flex h-max w-full justify-start md:justify-end">
          <button
            className="btn-tertiary btn btn-md btn-circle ml-4 mt-4 hidden xl:bg-neutral-0 bg-neutral-100 hover:bg-neutral-300 md:mr-4 md:flex"
            onClick={close}
          >
            <Svg src="/icons/bold/cancel.svg" className="inline h-3 w-3" />
          </button>
        </div>
        <div className="md:container flex-1 h-full w-full">
          <div className=" bg-neutral-0 h-full w-full overflow-y-auto scrollbar-hide flex-col flex xl:flex-row gap-10 px-0">
            {/* Left content */}
            <div className="flex flex-col xl:w-[65%] w-full gap-6 h-max">
              <div className="bg-[url(/images/sim-point-bg.png)] bg-cover bg-center aspect-cinema md:aspect-photo w-full relative md:rounded-2xl rounded-none">
                <button
                  className="btn-tertiary btn btn-md btn-circle bg-neutral-100 hover:bg-neutral-300 absolute top-10 left-2"
                  onClick={close}
                >
                  <Svg src="/icons/bold/cancel.svg" className="inline h-3 w-3" />
                </button>
                <div className="ml-[30%] md:ml-[10%] flex flex-col h-full justify-center">
                  <div className="font-itel font-bold text-neutral-0 text-base md:text-2xl">Điểm phong thủy</div>
                  <div className="itel font-bold text-neutral-0 text-h1 md:text-[7rem] md:leading-[7rem]">{`${point}/10`}</div>
                </div>
                <div className="absolute left-0 bottom-0">
                  <FlashSaleTimer />
                </div>
              </div>
              <div className="flex flex-col gap-4 px-4 md:px-0">
                <div className=" flex items-center gap-2">
                  <div className="font-itel text-2xl md:text-h3 font-bold">{simNumberTypeList('0876000491')}</div>
                  <ButtonCommit size="2xl" />
                  <ButtonGift isHaveGift size="large" />
                </div>
                <p className="font-bold text-xl text-neutral-800">Điểm phong thủy 9/10</p>
                <p className="font-normal text-base text-neutral-500">
                  Thí chủ Nam mệnh Sơn đầu hỏa mang nghĩa “lửa trên núi”. Cùng là hành Hỏa nhưng sau khi đi kèm với yếu tố nạp âm, mệnh Sơn
                  Đầu Hỏa lại mang những đặc trưng khác biệt với những mệnh Hỏa khác. Thí chủ phù hợp với các số 3,7, 6 và kỵ với các số 1,
                  9, nên chọn các số thuộc mệnh Hỏa, mệnh Mộc và tránh lựa chọn các số thuê bao thuộc mệnh Thủy.
                </p>
              </div>
              <div className="flex flex-col gap-4 px-4 md:px-0">
                <div className="grid grid-cols-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-neutral-500 font-normal">Mệnh</p>
                    <p className="text-base text-neutral-800 font-bold">Hỏa</p>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-l-neutral-300 pl-4">
                    <div className="flex gap-1">
                      <p className="text-sm text-neutral-500 font-normal">Số nút</p>
                      <ButtonInformation isShowTooltip />
                    </div>
                    <p className="text-base text-neutral-800 font-bold">7</p>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-l-neutral-300 pl-4">
                    <p className="text-sm text-neutral-500 font-normal">Cát - hung</p>
                    <p className="text-base text-neutral-800 font-bold">Đại Cát</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-normal">Quẻ kinh dịch</p>
                  <p className="text-base text-neutral-800 font-bold">
                    Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc thăng tiến. Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc
                    thăng tiến
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 px-4 md:px-0">
                <p className="text-base text-neutral-800 font-bold">Chỉ số sứ mệnh: 2</p>
                <p className="text-sm text-neutral-500 font-normal">
                  Điểm chung của những người mang số 2 trong thần số học là muốn mọi người tập trung vào bạn. Bạn luôn là người kết nối hòa
                  giải mâu thuẫn cho người khác.
                </p>
              </div>
              <div className="flex flex-col gap-2 px-4 md:px-0">
                <p className="text-base text-neutral-800 font-bold">Năm cá nhân: 2</p>
                <p className="text-sm text-neutral-500 font-normal">
                  Hợp tác và cân bằng: Trong năm thứ hai, khi các kế hoạch đã được ươm mầm thì cần có sự chăm sóc bởi các yếu tố bên ngoài
                  khác từ sự giúp đỡ, hợp tác với những người xung quanh. Trong thời gian này bạn cần hiểu rõ giới hạn của bản thân, xem khả
                  năng của mình đến đâu và bổ sung sự thiếu sót bằng những mối quan hệ xung quanh.
                </p>
              </div>
              <div className="flex flex-col gap-2 px-4 md:px-0">
                <p className="text-base text-neutral-800 font-bold">Biểu đồ ngày sinh</p>
                <p className="text-sm text-neutral-500 font-normal">
                  Trục mũi tên Quyết tâm (1.5.9): Bạn có đức tính kiên trì bền bỉ, sẵn sàng theo đuổi mục tiêu đến khi đạt được
                </p>
                <div className="flex justify-center px-4 md:px-0">
                  <div className="mt-2 grid w-full grid-cols-3 text-center text-4xl font-bold text-neutral-500 md:w-1/2">
                    <div className="border-b-4 border-neutral-800 p-4"></div>
                    <div className="border-x-4 border-b-4 border-neutral-800 p-4">66</div>
                    <div className="border-b-4 border-neutral-800 p-4">9</div>
                    <div className="border-b-4 border-neutral-800 p-4"></div>
                    <div className="border-x-4 border-b-4 border-neutral-800 p-4">5</div>
                    <div className="border-b-4 border-neutral-800 p-4">8</div>
                    <div className="p-4 ">1</div>
                    <div className="border-x-4 border-neutral-800 p-4"></div>
                    <div className="p-4 "></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 xl:pb-20 px-4 md:px-0">
                <p className="mb-2 text-base font-bold">Kim Tự Tháp Thần số học</p>
                <p className="text-base font-normal text-neutral-500">· Đỉnh cao sự nghiệp 1: 31 tuổi (2023)</p>
                <p className="text-base font-normal text-neutral-500">· Đỉnh cao sự nghiệp 2: 40 tuổi (2039)</p>
                <p className="text-base font-normal text-neutral-500">· Đỉnh cao sự nghiệp 3: 49 tuổi (2048)</p>
                <p className="text-base font-normal text-neutral-500">· Đỉnh cao sự nghiệp 4: 58 tuổi (2057)</p>
                <p className="text-base font-normal text-neutral-500">Biểu đồ ngày sinh thiếu năng lượng các số: 2, 3, 4, 6, 8</p>
                <p className="text-base font-normal text-neutral-500">
                  Biểu đồ ngày sinh thiếu các trục: 1.2.3; 4.5.6; 7.8.9; 1.4.7; 2.5.8; 3.6.9; 3.5.7
                </p>
                <p className="text-base font-normal text-neutral-500">Số đơn lẻ: 0</p>
                <div className="flex w-full items-center justify-center">
                  <Svg src="/images/chart-numerology.svg" className="inline h-[12.25rem] w-full md:h-[20rem] md:w-[33.6rem]" />
                </div>
              </div>
            </div>
            {/* Rigth content */}
            <div className="xl:p-6 p-0 flex flex-col gap-4 flex-1 px-4 md:px-0">
              <div className="flex flex-col">
                <div className=" flex items-center gap-2">
                  <div className="font-itel text-2xl font-bold xl:text-h5">{simNumberTypeList('0876000491')}</div>
                  <ButtonCommit />
                  <ButtonGift isHaveGift />
                </div>
              </div>
              <div className="xl:grid grid-cols-3 hidden">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-500 font-normal">Mệnh</p>
                  <p className="text-base text-neutral-800 font-bold">Hỏa</p>
                </div>
                <div className="flex flex-col gap-1 border-l border-l-neutral-300 pl-4">
                  <div className="flex gap-1">
                    <p className="text-sm text-neutral-500 font-normal">Số nút</p>
                    <ButtonInformation isShowTooltip />
                  </div>
                  <p className="text-base text-neutral-800 font-bold">7</p>
                </div>
                <div className="flex flex-col gap-1 border-l border-l-neutral-300 pl-4">
                  <p className="text-sm text-neutral-500 font-normal">Cát - hung</p>
                  <p className="text-base text-neutral-800 font-bold">Đại Cát</p>
                </div>
              </div>
              <div className="hidden xl:block">
                <p className="text-sm text-neutral-500 font-normal">Quẻ kinh dịch</p>
                <p className="text-base text-neutral-800 font-bold">
                  Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc thăng tiến. Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc
                  thăng tiến
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <p>Quà tặng kèm</p>
                {giftBonus.map((item) => (
                  <div
                    className={`rounded-xl px-4 py-2 flex justify-between items-center border cursor-pointer ${
                      item.id === giftId ? 'bg-neutral-0 border-red-500' : 'bg-neutral-50 border-transparent'
                    }`}
                    key={item.id}
                    onClick={() => setGiftId(item.id)}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <img src={item.image} alt="bonus" className="w-14 h-14" />
                      <p className="text-neutral-800 text-sm font-bold">{item.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-800">{item.price}đ</p>
                      <p className="text-xs font-normal text-neutral-500 line-through">{item.oldPrice}đ</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-normal text-neutral-500">Kết luận</p>
                <p className="text-base font-bold text-red-500 ">{status}</p>
              </div>
              <div className=" flex justify-between items-center pb-10">
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="font-bold text-neutral-800 md:text-sm lg:text-xl">75.000đ</div>
                  <div className="hidden w-10 rounded bg-red-500 px-1 py-0.5 text-center text-xs font-medium text-neutral-0 md:block">
                    -25%
                  </div>
                  <div className="text-sm font-medium text-neutral-500 line-through">100.000đ</div>
                </div>
                <div className={`flex items-center gap-4 w-1/2`}>
                  <button className="btn-tertiary btn btn-sm btn-circle">
                    <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
                  </button>
                  <button className="btn-primary btn btn-sm flex-1 whitespace-nowrap rounded-full" data-theme="light">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimExplainDetail;
