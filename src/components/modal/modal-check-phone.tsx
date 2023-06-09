import { modal, useModal } from '@/context/modal-context';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import { SubmitHandler, useForm } from 'react-hook-form';
import Routers from '@/routes/routers';
import Link from 'next/link';
import Svg from '../icon/svg';
import { createPortal } from 'react-dom';

type Props = {};

const ModalCheckPhone = (props: Props) => {
  const { done } = useModal();
  const methods = useForm<{ phone: string }>();

  const onSubmit: SubmitHandler<{ phone: string }> = (values) => {
    if (!values.phone.startsWith('087')) {
      methods.setError('phone', { message: 'Vui lòng nhập số điện thoại thuộc nhà mạng iTel để sử dụng dịch vụ!' });
    } else {
      return done(values);
    }
  };

  const isValid = methods.formState.isValid;
  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <HeaderMiddleAndFull title="Thông tin thuê bao" desc="Vui lòng nhập số điện thoại muốn đăng ký gói cước." />
        <div className="container md:px-0 bg-neutral-0 mt-2 py-4">
          <p className="md:hidden text-subtle-content">Vui lòng nhập số điện thoại muốn đăng ký gói cước.</p>
          <div className="mt-8 md:mt-0">
            <span className="label-text text-base" aria-required>
              Số điện thoại
            </span>
            <input
              type="tel"
              className="input w-full input-bordered mt-2"
              placeholder="Nhập số điện thoại"
              {...methods.register('phone', {
                pattern: {
                  value: /^(?:\+?84|0)(?:\d){9,10}$/,
                  message: 'Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!'
                },
                required: 'Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!'
              })}
            />
            {methods.formState.errors.phone && (
              <p className="label-text mt-2 text-red-500 flex">
                <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />
                {methods.formState.errors.phone.message}
              </p>
            )}
          </div>
          <div className="mt-8">
            <div className="w-1/2 px-3 mx-auto">
              <button className="btn btn-primary rounded-full w-full" disabled={!isValid}>
                Tiếp tục
              </button>
            </div>
            <p className="mt-6 text-subtle-content text-center">
              <span className="max-md:block">Bạn chưa có Sim?</span>
              <Link href={Routers.SIM} className="text-red-500">
                <b> Mua Sim với gói cước </b>
              </Link>
              ngay nhé.
            </p>
          </div>
        </div>
      </form>
      {createPortal(
        <div className="fixed bottom-0 md:bottom-auto md:top-1/2 left-0 z-50">
          <div className="bg-neutral-50 rounded-r-xl p-3">
            {[
              { name: 'Số điện thoại không hợp lệ', value: ModalCheckPhone.INVALID_PHONE },
              { name: 'Gói cước đang dùng bị trùng', value: ModalCheckPhone.PHONE_USING_SAME_DATA_PACK },
              { name: 'Đang dùng gói khác', value: ModalCheckPhone.PHONE_USING_DIFFERENT_DATA_PACK },
              { name: 'Chưa có gói nào', value: ModalCheckPhone.PHONE_NOT_USING_DATA_PACK },
              { name: 'Không đủ điều kiện', value: ModalCheckPhone.PHONE_NOT_MEET_REQUIREMENT }
            ].map(({ name, value }) => (
              <label key={value} className="flex gap-x-2">
                <input
                  type="radio"
                  value={value}
                  name="phone"
                  onChange={(e) => {
                    methods.setValue('phone', e.target.value);
                    methods.trigger('phone', { shouldFocus: true });
                  }}
                />
                <span>{name}</span>
              </label>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

ModalCheckPhone.INVALID_PHONE = '0987654321';
ModalCheckPhone.PHONE_USING_SAME_DATA_PACK = '0876543210';
ModalCheckPhone.PHONE_USING_DIFFERENT_DATA_PACK = '0876543211';
ModalCheckPhone.PHONE_NOT_USING_DATA_PACK = '0876543212';
ModalCheckPhone.PHONE_NOT_MEET_REQUIREMENT = '0876543213';

export function modalPhoneCheck(done?: (data: { phone: string }) => void | Promise<void>) {
  modal.open({
    render: <ModalCheckPhone />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    onDone: done
  });
}

export default ModalCheckPhone;
