import { modal } from '@/context/modal-context';
import Svg from '@/components/icon/svg';
import { FC } from 'react';
import InputField from '@/components/form/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

type FormValues = {
  fullName: string;
  cardNumber: string;
  birthDay: string;
  gender: string;
  createDate: string;
  issuedBy: string;
  address: string;
};

const InitValue = {
  fullName: 'Nguyễn Văn A',
  cardNumber: '123 456 789',
  birthDay: '22/12/2000',
  gender: 'Nam',
  createDate: '22/12/2022',
  issuedBy: 'Công an Thành phố Hà Nội',
  address: '34 đường Quang Trung, Phường Quang Trung, Quận Hà Đông, Thành phố Hà Nội'
};

const SchemaValidation = yup
  .object({
    fullName: yup.string().required(),
    cardNumber: yup.string().required(),
    birthDay: yup.string().required(),
    gender: yup.string().required(),
    createDate: yup.string().required(),
    issuedBy: yup.string().required(),
    address: yup.string().required()
  })
  .required();

const InputCard: FC<{
  title: string;
  icon: string;
  value: string;
  className?: string;
  classNameImage?: string;
}> = ({ value, title, icon, className, classNameImage = 'aspect-[8/5] max-w-[224px] md:max-w-[280px] mx-auto max-w-full ' }) => {
  return (
    <div className={clsx('rounded-2xl border border-neutral-200 p-6 text-center', className)}>
      <p className="font-medium text-sm text-neutral-500">
        {title} <span className="text-red-500"> *</span>
      </p>

      <div className={clsx('mt-4 rounded-xl overflow-hidden', classNameImage)}>
        {value ? <img alt="" src={value} className="w-full h-full object-cover" /> : <Svg className="w-full h-full" src={icon} />}
      </div>

      <button
        type="button"
        className="block w-[130px] btn btn-tertiary rounded-full mx-auto mt-4 md:mt-10"
        // onClick={}
      >
        {!!value ? 'Chụp lại' : 'Chụp ảnh'}
      </button>
    </div>
  );
};

const InfoUserStep: FC<{ submit: (v: any) => void }> = ({ submit }) => {
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
    submit(payload);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-6 gap-x-6  xl:grid-cols-8">
        <InputCard
          className="xl:col-span-3"
          title="Ảnh CCCD/CMND mặt trước"
          icon="/icons/others/card-front.svg"
          value="https://www.w3schools.com/w3css/img_lights.jpg"
        />
        <InputCard className="xl:col-span-3" title="Ảnh CCCD/CMND mặt sau" icon="/icons/others/card-back.svg" value="" />
        <InputCard
          className="xl:col-span-2"
          classNameImage="aspect-[7/6] h-[140px] md:h-[175px] max-w-full mx-auto"
          title="Ảnh chân dung"
          icon="/icons/others/avatar.svg"
          value=""
        />
      </div>

      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 xl:gap-x-10">
        <div className="col-span-1">
          <InputField disabled inputLabel="Họ và tên" placeholder="Họ và tên" control={control} name="fullName" />
        </div>
        <div className="col-span-1">
          <InputField disabled inputLabel="Số căn cước công dân" placeholder="Số căn cước công dân" control={control} name="cardNumber" />
        </div>
        <div className="col-span-1">
          <InputField disabled inputLabel="Ngày sinh" placeholder="Ngày sinh" control={control} name="birthDay" />
        </div>
        <div className="col-span-1">
          <InputField disabled inputLabel="Giới tính" placeholder="Giới tính" control={control} name="gender" />
        </div>
        <div className="col-span-1">
          <InputField disabled inputLabel="Ngày cấp" placeholder="Ngày cấp" control={control} name="createDate" />
        </div>
        <div className="col-span-1">
          <InputField disabled inputLabel="Nơi cấp" placeholder="Nơi cấp" control={control} name="issuedBy" />
        </div>
        <div className="col-span-1 md:col-span-2">
          <InputField
            inputLabel="Nơi thường trú (Bạn có thể sửa thông tin tại ô này nếu địa chỉ thay đổi)"
            placeholder="Nơi thường trú (Bạn có thể sửa thông tin tại ô này nếu địa chỉ thay đổi)"
            control={control}
            name="address"
          />
        </div>
      </div>

      <button
        // disabled={!isDirty || !isValid}
        type="button"
        className="block w-[206px] btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit(submitForm)}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default InfoUserStep;
