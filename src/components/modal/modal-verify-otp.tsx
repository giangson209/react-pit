import { modal, useModal } from '@/context/modal-context';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import useBoolean from '@/hooks/useBoolean';
import useCountdown from '@/hooks/useCountdown-v2';
import { useEffect, useRef, useState } from 'react';
import useOtpInput from '@/hooks/useOtpInput';

type Props = {
  phone: string;
};

const ModalVerifyOtp = ({ phone }: Props) => {
  const { done } = useModal();
  const numInputs = 4;
  const verify = useBoolean(false);
  const submitting = useBoolean(false);

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { handleChange, handleFocus, handleKeyDown, inputRefs } = useOtpInput(otp, setOtp);

  const [value, { startCountdown, resetCountdown, stopCountdown }] = useCountdown({ countStart: 60 });
  useEffect(() => {
    verify.value ? startCountdown() : stopCountdown();
  }, [verify.value, startCountdown, stopCountdown]);
  useEffect(() => {
    setError('');
  }, [otp]);

  const handleSubmit = async () => {
    try {
      submitting.setTrue();
      if (otp.length !== numInputs) return;
      await done(otp);
    } catch (error: any) {
      setError(error.message);
    } finally {
      submitting.setFalse();
    }
  };

  return (
    <div>
      <HeaderMiddleAndFull title="Thông báo" />
      {verify.value ? (
        <div className="container md:px-0 bg-neutral-0 mt-2 py-4 text-subtle-content text-center">
          <div className="space-y-5 md:space-y-6">
            <p className="text-left md:text-center">
              iTel đã gửi một mã xác thực OTP
              <br className="max-md:hidden" /> đến số điện thoại <b className="text-base-content">{formatPhoneNumber(phone)}</b>
            </p>
            <div className="text-center text-base-content space-x-2">
              {Array.from({ length: numInputs }, (_, index) => {
                return (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    tabIndex={index + 1}
                    type="tel"
                    className="input w-18 h-20 input-bordered outline-none text-s-md text-center font-medium"
                    size={1}
                    value={otp[index] ?? ''}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={(event) => handleFocus(event)(index)}
                    autoComplete="off"
                  />
                );
              })}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <p>Nhập mã OTP để xác thực</p>
            <button disabled={Boolean(value)} onClick={resetCountdown}>
              <b>Gửi lại mã {value ? `(${value}s)` : null}</b>
            </button>
          </div>
          <div className="mt-8 md:mt-6 w-full md:w-1/2 mx-auto">
            <button className="btn btn-primary rounded-full w-full" disabled={otp.length !== numInputs} onClick={handleSubmit}>
              Xác nhận
            </button>
          </div>
        </div>
      ) : (
        <div className="container md:px-0 bg-neutral-0 mt-2 py-4">
          <div className="block-img block-video">
            <img
              src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685966734/itel/images/Block_Image_vfkriq.jpg"
              alt="123"
              className="object-cover"
            />
          </div>
          <p className="mt-4 md:mt-6">
            iTel đã gửi<b> thông báo xác nhận </b>đăng ký gói cước tới thuê bao <b>{formatPhoneNumber(phone)}</b>. Vui lòng thực hiện xác
            nhận trên điện thoại để hoàn tất việc đăng ký.
          </p>
          <br />
          <p>
            Trường hợp bạn không nhận được thông báo xác nhận gửi về điện thoại, vui lòng chọn
            <span onClick={verify.setTrue} className="text-red-500 cursor-pointer">
              <b> Xác thực bằng OTP</b>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ModalVerifyOtp;

export function verifyOtp(data: Props, options?: { onDone?(data: { otp: string }): Promise<void> | void }) {
  return modal.open({
    render: <ModalVerifyOtp {...data} />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    ...options
  });
}
