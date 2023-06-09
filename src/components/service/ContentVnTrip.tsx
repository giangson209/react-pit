import Svg from '../icon/svg';

type IProps = {};
const ContentVnTrip = () => {
  return (
    <>
      <div className="container lg:grid grid-flow-col lg:p-0">
        <div className="xl:aspect-square aspect-square lg:aspect-photo-vertical">
          <img src="/service/popupVnTrip.png" alt="" className="w-full lg:h-full object-cover" />
        </div>
        <div className="lg:px-10 lg:max-w-[590px] py-10">
          <div className="text-base text-neutral-500 flex flex-col gap-1 mt-8 lg:mt-0">
            <p>Itel Du Lịch</p>
            <h1 className="font-bold text-[32px] text-neutral-800 leading-tight">
              Deal khủng mùa thu - Vi vu khắp chốn cùng itel x Vntrip
            </h1>
          </div>
          <div className="text-sm font-bold text-neutral-800 grid grid-cols-4 gap-6 items-center w-full mt-8 px-[52px]">
            <div className="flex flex-col gap-2 items-center w-full">
              <div className="rounded-full aspect-square w-16 overflow-hidden">
                <img alt="" src="/service/popupVnTrip.png" className="object-cover h-full w-full" />
              </div>
              <p>Khách sạn</p>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <div className="rounded-full aspect-square w-16 overflow-hidden">
                <img alt="" src="/service/popupVnTrip.png" className="object-cover h-full w-full" />
              </div>
              <p>Combo</p>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <div className="rounded-full aspect-square w-16 overflow-hidden">
                <img alt="" src="/service/popupVnTrip.png" className="object-cover h-full w-full" />
              </div>
              <p>Máy bay</p>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <div className="rounded-full aspect-square w-16 overflow-hidden">
                <img alt="" src="/service/popupVnTrip.png" className="object-cover h-full w-full" />
              </div>
              <p>Nhà nghỉ</p>
            </div>
          </div>
          <div className="mt-6 text-base text-neutral-800">
            <h1 className="text-xl font-medium">Ưu đãi dành riêng cho iTel Club-er</h1>
            <div className="flex flex-col gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <div>
                  <Svg src="/icons/bold/check.svg" className="bg-pink aspect-square rounded-full w-5 p-[2px]" />
                </div>
                <p>Sản phẩm áp dụng: Vé máy bay, phòng khách sạn, Combo đồng gia của Vntrip</p>
              </div>
              <div className="flex gap-2 items-center">
                <div>
                  <Svg src="/icons/bold/check.svg" className="bg-pink aspect-square rounded-full w-5 p-[2px]" />
                </div>
                <p>Bạn sẽ được chuyển đến màn hình đặt phòng, vé máy bay của Công ty TNHH Công nghệ VNTRIP. </p>
              </div>
              <div className="flex gap-2 items-center">
                <div>
                  <Svg src="/icons/bold/check.svg" className="bg-pink aspect-square rounded-full w-5 p-[2px]" />
                </div>
                <p>Hoàn đến 20% thanh toán qua thẻ</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:items-start items-center">
            <button className="btn btn-primary rounded-full px-16 mt-10">Tiếp tục</button>
            <p className="mt-3 text-neutral-500 text-sm">
              Bằng việc bấm <b>Tiếp tục</b>, bạn sẽ được chuyển sang trang đối tác của iTel.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentVnTrip;
