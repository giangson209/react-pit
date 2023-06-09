import Svg from '../icon/svg';

type CardDataPackProps = {
  name: string;
  data: string;
  newPrice: string;
  oldPrice: string;
  saleOff: string;
  index?: number
};

const CardDataPackOutStanding = ({ data, name, newPrice, oldPrice, saleOff, index }: CardDataPackProps) => {
  return (
    <div className={`flex flex-col gap-4 rounded-[2rem] border border-neutral-300 bg-neutral-0 p-6 ${index === 1 ? 'flex-1' : 'w-[23.25rem]'}`}>
      <div className={`flex flex-col items-center rounded-3xl bg-neutral-50 px-4 pb-6 ${index === 1 ? 'gap-6' : 'gap-4'}`}>
        <div className="flex w-full items-center justify-between border-b border-b-neutral-300 py-2">
          <div className="flex items-center gap-1">
            <Svg src="/icons/bold/fire.svg" className="inline h-6 w-6" />
            <p className="text-base font-bold text-neutral-800">{name}</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold hover:text-red-500">
            Chi tiết
            <Svg src="/icons/line/arrow-right.svg" className="inline h-4 w-4 hover:text-red-500" />
          </button>
        </div>
        <p className="font-itel text-h4 font-bold text-neutral-800">{data}GB/NGÀY</p>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-normal text-neutral-800">Miễn phí</p>
          <p className="text-base font-bold text-neutral-800">300 SMS</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-normal text-neutral-800">Miễn phí</p>
          <p className="text-base font-bold text-neutral-800">Gọi nội mạng iTel và VinaPhone</p>
          <p className="text-xs font-normal text-neutral-500">(Áp dụng cuộc gọi dưới 10 phút, tối đa 1.000 phút)</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xl font-bold text-neutral-800">
            {newPrice}
            <span className="text-sm font-normal text-neutral-500">đ/ tháng</span>
          </p>
          <p className="text-xs font-normal text-neutral-500 line-through">{oldPrice}đ</p>
        </div>
        <button className="btn-primary btn btn-md rounded-full">Đăng ký ngay</button>
      </div>
    </div>
  );
};

export default CardDataPackOutStanding;
