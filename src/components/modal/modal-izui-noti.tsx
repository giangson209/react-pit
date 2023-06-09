import React from 'react';

type ModalProps = {
  isComeSlow?: Boolean;
  isNotMember?: Boolean;
  isSuccess?: Boolean;
  close?: () => void;
};

const ModalIzuiNoti = ({ isComeSlow = false, isNotMember = false, isSuccess = false, close }: ModalProps) => {
  return (
    <div>
      <div className="flex justify-center">
        <img src={isSuccess ? `/iwow/action-success.png` : `/iwow/action-error.png`} alt="" />
      </div>
      {isComeSlow && (
        <div>
          <p className="mt-2 text-neutral-800 text-xl font-bold text-center">Tiếc quá! Bạn bị chậm mất rồi</p>
          <p className="mt-2 text-base text-neutral text-center">
            Số lượng deal đã hết lượt, nhưng đừng lo, iTel có rất chương trình khuyến mãi khác. Nhớ vào iZui thường xuyên để nhận được nhiều
            ưu đãi liền tay nhé!
          </p>
          <div>
            <button className="btn-primary btn btn-md mt-6 w-full rounded-full">Khám phá iZui ngay</button>
          </div>
        </div>
      )}

      {isNotMember && (
        <div>
          <p className="mt-2 text-neutral-800 text-xl font-bold text-center">Tiếc quáaa!!! Bạn chưa phải là hội viên iTel</p>
          <p className="mt-2 text-base text-neutral text-center">
            Số điện thoại của bạn chưa đủ điều kiện để trở thành hội viên iTel Club. Sau 3 ngày kể từ ngày kích hoạt, số điện thoại của bạn
            sẽ được tham gia chương trình Hội viên thân thiết iTel Club.
          </p>

          <p className="mt-2 text-base text-neutral text-center">
            Chi tiết liên hệ{' '}
            <a className="font-bold" href="tel:087708787">
              087708787
            </a>{' '}
            <br />
            (Miễn phí với Thuê bao iTel)
          </p>
        </div>
      )}

      {isSuccess && (
        <div>
          <p className="mt-2 text-neutral-800 text-xl font-bold text-center">Bạn thật nhanh tay! Deal hot đã thuộc về bạn.</p>
          <p className="mt-2 text-base text-neutral text-center">
            iTel đã gửi thông tin Voucher về SMS đến bạn hoặc bạn có thể xem tại{' '}
            <a className="text-primary font-bold" href="">
              Ưu đãi đã nhận
            </a>
          </p>
          <div className="flex ">
            <div className="w-1/2 mr-2">
              <button className="btn-secondary btn btn-md mt-6 w-full rounded-full">Để sau</button>
            </div>
            <div className="w-1/2 ml-2">
              <button className="btn-primary btn btn-md mt-6 w-full rounded-full">Dùng ngay</button>
            </div>
          </div>

          <div>
            <p className="mt-4 text-base text-neutral text-center">
              Để sau Dùng ngay Bạn chưa có Sim?{' '}
              <a className="text-primary font-bold" href="">
                Mua Sim với gói cước
              </a>{' '}
              ngay nhé
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ModalIzuiNoti;
