import { toCurrency } from '@/utilities/currency';

export type CardDataPackProps = {
  onDetail?(): void;
  onRegister?(): void;
  image?: string;
};

const CardDataPack = ({ onDetail, image, onRegister }: CardDataPackProps) => {
  return (
    <div className="card card-side bg-base-100 py-4 md:py-0 border-b md:border-none border-neutral-100 max-md:rounded-none overflow-hidden">
      <div className="w-29 md:w-48 xl:w-60 overflow-hidden">
        <figure className="block-img block-square center-by-grid">
          <img src={image} alt="promotion image" className="h-full w-full object-cover rounded-lg md:rounded-none" />
          <div className="scale-[68%] md:scale-100 absolute text-neutral-0 font-itel text-2xl text-center font-semibold md:-mt-8">
            Gói iTel69
            <div className="text-3xl">
              <span className="text-4xl text-yellow-400">3GB</span>/ngày
            </div>
          </div>
        </figure>
      </div>
      <div className="card-body px-4 py-2.5 md:px-6 md:py-4 xl:pt-6 xl:pb-5">
        <div className="flex-1 text-sm">
          <p>
            <span className="max-md:hidden">Miễn phí </span>
            <b className="xl:text-base">3GB/ngày & 300 SMS</b>
          </p>
          <div className="max-md:hidden mt-2 xl:mt-4">
            <p>
              <span>Miễn phí </span>
              <b className="xl:text-base">gọi nội mạng iTel và VinaPhone</b>
            </p>
            <p className="text-xs">(Áp dụng cuộc gọi dưới 10 phút, tối đa 1.000 phút)</p>
          </div>
          <div className="mt-1 md:mt-2 xl:mt-4 text-xs">
            <b className="mr-1 md:mr-2">
              <span className="text-sm md:text-base xl:text-xl">{toCurrency(50_000)}</span>
              <span className="text-xs md:text-sm">/ tháng</span>
            </b>
            <s className="text-xs">
              <span>{toCurrency(77_000)}</span>
              <span className="max-md:hidden">/ tháng</span>
            </s>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="first-letter:uppercase font-medium hover:text-red-500 whitespace-nowrap" onClick={onDetail}>
            <span className="max-md:hidden">Xem chi tiết</span>
            <span className="md:hidden">Chi tiết</span>
          </button>
          <button className="whitespace-nowrap flex-shrink-0 btn btn-secondary btn-sm rounded-full max-md:py-2" onClick={onRegister}>
            Đăng ký<span className="max-md:hidden ml-1"> ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDataPack;
