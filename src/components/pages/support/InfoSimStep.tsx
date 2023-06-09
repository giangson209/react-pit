import { modal } from '@/context/modal-context';
import Svg from '@/components/icon/svg';
import { FC } from 'react';
import InputField from '@/components/form/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  phone: string;
  seri: string;
};

const InitValue = {
  phone: '',
  seri: ''
};

const SchemaValidation = yup
  .object({
    phone: yup
      .string()
      // .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'Số điện thoại không đúng định dạng')
      .required('Số điện thoại không đúng định dạng'),
    seri: yup.string().required('Số Serial không hợp lệ')
  })
  .required();

const InfoSimStep: FC<{ submit: (v: any) => void }> = ({ submit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isDirty, isValid }
  } = useForm<FormValues>({
    defaultValues: InitValue,
    resolver: yupResolver(SchemaValidation),
    mode: 'all'
  });

  const submitForm = (payload: FormValues) => {
    if (false) {
      return modal.confirm({
        title: '',
        content: (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-5">
              <Svg className="h-full w-full" src="/icons/others/phone-failed.svg" />
            </div>
            <h2 className="text-xl md:text-s-md font-bold">Số serial chưa chính xác</h2>
            <p className="mt-4 md:mt-8 text-subtle-content whitespace-pre-line">
              {'Thông tin Sim & số serial không khớp. \n Bạn vui lòng kiểm tra và thực hiện lại nhé!'}
            </p>
          </div>
        ),
        confirmLable: 'Đã hiểu',
        onDone() {}
      });
    }
    // lock sim
    if (false) {
      return modal.confirm({
        title: 'Sim đang bị khóa',
        content: (
          <>
            Số thuê bao <b>0877 123 456</b> đang bị khóa. Bạn vui lòng kiểm tra lại hoặc liên hệ CSKH 0877 087 087 (miễn phí cho thuê bao
            iTel) để được hỗ trợ thêm nhé!
          </>
        ),
        rejectLable: 'Nhập lại thông tin',
        confirmLable: 'Chat với CSKH',
        onDone() {}
      });
    }

    submit(payload);
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row-reverse gap-y-4 md:gap-y-6 xl:gap-x-10">
        <div className="flex gap-x-4 gap-y-2 items-center xl:flex-col xl:w-[196px]">
          <div className="min-w-[98px] w-[98px] h-[59px] xl:w-[196px] xl:h-[117px]">
            <Svg className="w-full h-full" src="/icons/sim.svg" />
          </div>
          <p className="text-sm flex-1 xl:text-right">Số Serial nằm trên phôi Sim, bắt đầu bằng 087</p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 xl:gap-x-10">
          <div className="col-span-1">
            <InputField inputLabel="Số thuê bao cần kích hoạt" placeholder="Nhập số thuê bao iTel" control={control} name="phone" />
          </div>
          <div className="col-span-1">
            <InputField inputLabel="Serial" placeholder="Nhập 11 số cuối serial Sim" control={control} name="seri" />
          </div>
        </div>
      </div>

      <button
        disabled={!isDirty || !isValid}
        type="button"
        className="block w-[206px] btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit(submitForm)}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default InfoSimStep;
