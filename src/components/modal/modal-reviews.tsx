import clsx from 'clsx';
import { useId, useMemo } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { fileToBlob } from '@/utilities/image';

import Svg from '../icon/svg';
import Modal from './modal';
import LabelOut from '../input/label-out';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { toCurrency } from '@/utilities/currency';
import useIsClient from '@/hooks/useIsClient';

type Props = {
  open?: boolean;
  onClose?(): void;

  itemName: string;
  itemImage: string;
  itemDesc?: string;
  itemPrice: number;
};

type IForm = {
  rating: number;
  tags?: number;

  attachments?: File[] | FileList;

  name: string;
  phone: string;
};
const rates = [
  { value: 1, title: 'Rất tệ' },
  { value: 2, title: 'Tệ' },
  { value: 3, title: 'Bình thường' },
  { value: 4, title: 'Tốt' },
  { value: 5, title: 'Rất tốt' }
];
const quickTags = [
  { id: 1, title: 'Sản phẩm tốt' },
  { id: 2, title: 'Đúng mô tả' },
  { id: 3, title: 'Giá phải chăng' },
  { id: 4, title: 'Cấu hình mượt' },
  { id: 5, title: 'Ý kiến khác' }
];
const ModalReview = ({ onClose, itemName, itemPrice, itemImage, itemDesc }: Props) => {
  useIsClient();
  const fileId = useId();
  const methods = useForm<IForm>({});

  const attachments = useWatch<IForm, 'attachments'>({ name: 'attachments', control: methods.control });
  const previews = useMemo(() => fileToBlob(attachments), [attachments]);

  const onSubmit: SubmitHandler<IForm> = (values) => {
    onClose?.();
    toast.success('Gửi đánh giá thành công');
  };

  const onRemoveImage = function (index: number) {
    const files = Array.from(methods.getValues('attachments') || []);

    files.splice(index, 1);
    methods.setValue('attachments', files);
  };

  const isValid = methods.formState.isDirty && methods.formState.isValid;

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
      <Modal.Heading title="Đánh giá Sản phẩm" />
      <Modal.ModalContent className="">
        <div className="card flex-row gap-x-3 bg-neutral-100 p-3 font-medium">
          <div className="w-12">
            <div className="card-image block-img block-square w-full">
              <img src={itemImage} alt={itemName} className="rounded-lg object-cover" />
            </div>
          </div>
          <div>
            <p>{itemName}</p>
            <p>{toCurrency(itemPrice)}</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="mx-auto mt-1 flex justify-center py-2">
            {rates.map(({ title, value }, i) => {
              return (
                <label key={value} className="block w-20 cursor-pointer whitespace-nowrap text-center text-xs font-medium">
                  <input type="radio" className="peer sr-only" value={value} {...methods.register('rating', { value, required: true })} />
                  <Svg className="inline text-neutral-100 peer-checked:text-yellow-500" src="/icons/bold/star.svg" width={32} height={32} />
                  <p className="mt-1">{title}</p>
                </label>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {quickTags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  value={tag.id}
                  {...methods.register('tags', { valueAsNumber: true, required: true })}
                />
                <span className="btn-tertiary btn btn-sm font-medium peer-checked:bg-red-600 peer-checked:text-neutral-0">{tag.title}</span>
              </label>
            ))}
          </div>
          <div>
            <textarea
              className="h-27 w-full resize-none rounded-lg border border-neutral-200 bg-transparent p-4 outline-none"
              placeholder="Mời bạn chia sẻ cảm nhận về sản phẩm ..."
            />
            <input
              type="file"
              multiple
              id={fileId}
              {...methods.register('attachments')}
              onChange={(event) => {
                if (!event.target.files) return;
                const oldImages = Array.from(methods.getValues('attachments') || []);
                const newImages = Array.from(event.target.files);

                const files = oldImages.concat(newImages);
                methods.setValue('attachments', files);
              }}
              hidden
              className="sr-only"
            />
            {previews.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {previews.map((preview, idx) => (
                  <div key={preview.id} className="relative w-16">
                    <div className="block-img block-square">
                      <img alt={preview.name} src={preview.src} className="rounded-lg object-cover" loading="lazy" />
                    </div>
                    <button
                      type="button"
                      className="transition-default btn-tertiary btn btn-circle absolute -right-1 -top-1 h-5 w-5 hover:btn-primary"
                      onClick={() => onRemoveImage(idx)}
                    >
                      <Svg src="/icons/line/close.svg" width={16} height={16} />
                    </button>
                  </div>
                ))}
                <div>
                  <label
                    className="block h-16 w-16 rounded-lg border border-dashed border-neutral-300 bg-neutral-100 center-by-grid"
                    htmlFor={fileId}
                    role="button"
                  >
                    <Svg src="/icons/line/plus.svg" width={24} height={24} />
                  </label>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-center">
                <label htmlFor={fileId} className="btn-tertiary btn btn-sm gap-x-2 rounded-full">
                  <Svg src="/icons/line/image.svg" width={20} height={20} />
                  Thêm hình ảnh
                </label>
              </div>
            )}
            <hr className="mt-4 border-t border-neutral-200" />
            <div className="mt-4">
              <div className="-mx-3 flex">
                <LabelOut label="Họ và tên" className="w-full px-3" required>
                  <input
                    type="text"
                    placeholder="Nhập Họ và Tên"
                    className="input-bordered input w-full outline-none autofill:shadow-neutral-0"
                    autoComplete="off"
                    style={{
                      WebkitBoxShadow: '0 0 0px 1000px #ffffff inset'
                    }}
                    {...methods.register('name', { required: true })}
                  />
                  {methods.formState.errors.name && <p className="label-text text-red-500">{methods.formState.errors.name.message}</p>}
                </LabelOut>
                <LabelOut label="Số điện thoại" className="w-full px-3" required>
                  <input
                    type="tel"
                    placeholder="Nhập Số điện thoại"
                    className="input-bordered input w-full outline-none"
                    {...methods.register('phone', { required: true })}
                    style={{
                      WebkitBoxShadow: '0 0 0px 1000px #ffffff inset'
                    }}
                  />
                  {methods.formState.errors.phone && <p className="label-text text-red-500">{methods.formState.errors.phone.message}</p>}
                </LabelOut>
              </div>
              <label className="label mt-2 w-auto cursor-pointer justify-normal py-3">
                <div className="mr-2 p-0.5">
                  <input type="checkbox" className="block" />
                </div>
                <span className="label-text font-medium">Tôi sẽ giới thiệu sản phẩm này cho bạn bè người thân</span>
              </label>
            </div>
          </div>
        </div>
      </Modal.ModalContent>
      <Modal.ModalActions className="text-center">
        <div>
          <button type="submit" disabled={!isValid} className="btn-primary btn btn-lg min-w-[14.5rem] rounded-full">
            Gửi đánh giá
          </button>
        </div>
        <p className="mt-3 text-subtle-content">
          Để đánh giá được duyệt, bạn vui lòng tham khảo{' '}
          <Link href="/" className="text-red-500">
            <b>Quy định duyệt đánh giá</b>
          </Link>
        </p>
      </Modal.ModalActions>
    </form>
  );
};

export default ModalReview;
