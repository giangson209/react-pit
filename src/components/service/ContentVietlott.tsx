import Svg from '../icon/svg';

type IProps = {};
const ContentVietlott = () => {
  return (
    <>
      <div className="container lg:grid grid-flow-col lg:p-0">
        <div className="xl:aspect-square lg:aspect-photo-vertical bg-red-500">
          <img src="/service/popupVietlott.png" alt="" className="w-full lg:h-full object-cover" />
        </div>
        <div className="lg:px-10 lg:max-w-[590px] lg:py-10">
          <div className="text-base text-neutral-500 flex flex-col gap-1 mt-8 lg:mt-0">
            <p>Xổ số Vietlott</p>
            <h1 className="font-bold text-[32px] text-neutral-800 leading-tight">Thông tin khách hàng</h1>
            <p>Thông tin bạn điền sẽ được sử dụng để lập tài khoản tự động trên hệ thống Vietlott và là tài khoản nhận thưởng sau này.</p>
          </div>
          <p className="text-sm text-neutral-800 mt-8 mb-2">
            Số điện thoại: <b className="text-red-500">*</b>
          </p>
          <div className="flex gap-6 items-center">
            <input className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full" placeholder="Nhập số điện thoại" />
            <button className="btn btn-secondary rounded-full whitespace-nowrap px-8">Nhận OTP</button>
          </div>
          <div className="flex flex-col items-center mt-10">
            <p className="text-base text-neutral-500">Nhập mã OTP đã được gửi về số điện thoại của bạn</p>
            <div className="grid grid-cols-4 gap-2 mt-6">
              <input className="p-4 border border-neutral-300 rounded-xl bg-transparent text-[40px] w-18 text-center" />
              <input className="p-4 border border-neutral-300 rounded-xl bg-transparent text-[40px] w-18 text-center" />
              <input className="p-4 border border-neutral-300 rounded-xl bg-transparent text-[40px] w-18 text-center" />
              <input className="p-4 border border-neutral-300 rounded-xl bg-transparent text-[40px] w-18 text-center" />
            </div>
            <button className="btn btn-primary rounded-full px-16 mt-20">Tiếp tục</button>
            <p className="mt-3 text-neutral-500">
              Bằng việc bấm <b>Tiếp tục</b>, bạn sẽ được chuyển sang trang đối tác của iTel.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentVietlott;
