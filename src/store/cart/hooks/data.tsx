import ModalChangePack from '@/components/modal/modal-change-pack';
import ModalCheckPhone, { modalPhoneCheck } from '@/components/modal/modal-check-phone';
import { modalPackageDetail } from '@/components/modal/modal-data-package-detail';
import { verifyOtp } from '@/components/modal/modal-verify-otp';
import { modal } from '@/context/modal-context';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { sleep } from '@/utilities/time';
import { useCallback } from 'react';

export const useDataModal = () => {
  async function handleVerifyOtp(data: { otp: string }) {
    if (data.otp !== '1234') {
      await sleep(2000);
    }
    await sleep(1000);
    throw new Error('Mã ô tê pê không hợp lệ, vui lòng thử lại\nHint: 1234');
  }
  // Case 1
  const handleRegistrantionRenewal = useCallback((data: { phone: string }) => {
    switch (data.phone) {
      case ModalCheckPhone.PHONE_NOT_MEET_REQUIREMENT:
        modal.confirm({
          content: (
            <>
              Thuê bao <b className="text-base-content">{formatPhoneNumber(data.phone)}</b> hiện không đủ điều kiện đăng ký gói cước này.
              Vui lòng lựa chọn gói cước khác.
              <br />
              Tips: Sử dụng chức năng <b className="text-base-content">Tìm gói cước theo thuê bao </b>để tra cứu các gói cước thuê bao của
              bạn
            </>
          ),
          type: 'middle-sheet',
          title: 'Thuê bao không đủ điều kiện',
          rejectLable: 'Thay đổi số',
          confirmLable: 'Tìm gói phù hợp'
        });
        break;
      case ModalCheckPhone.PHONE_USING_SAME_DATA_PACK:
        modal.confirm({
          content: (
            <>
              Gói cước <b className="text-base-content">PARTY79</b> đang được thuê bao{' '}
              <b className="text-base-content">{formatPhoneNumber(data.phone)}</b> sử dụng (HSD: còn 18 ngày). Bằng việc bấm “Tiếp tục”, bạn
              đồng ý gia hạn gói cước này.
            </>
          ),
          type: 'middle-sheet',
          title: 'Gia hạn đăng ký',
          rejectLable: 'Thay đổi số',
          confirmLable: 'Tiếp tục',
          onDone: () =>
            verifyOtp(data, {
              onDone: handleVerifyOtp
            })
        });
        break;
      case ModalCheckPhone.PHONE_NOT_USING_DATA_PACK:
        modal.confirm({
          content: (
            <>
              Vui lòng bấm Tiếp tục để xác nhận đăng ký gói cước <b className="text-base-content">PARTY79</b> cho thuê bao
              <b className="text-base-content">{formatPhoneNumber(data.phone)}</b>
            </>
          ),
          type: 'middle-sheet',
          title: 'Xác nhận đăng ký gói cước',
          rejectLable: 'Thay đổi số',
          confirmLable: 'Tiếp tục'
          // onDone: () =>
          //   verifyOtp(data, {
          //     onDone: handleVerifyOtp
          //   })
        });
        break;
      case ModalCheckPhone.PHONE_USING_DIFFERENT_DATA_PACK:
        modal.open({
          render: <ModalChangePack {...data} />,
          closeButton: false,
          transition: false,
          className: 'modal-box shadow-itel md:max-w-[45rem]',
          classNameContainer: 'modal-full md:modal-middle',
          classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
        });
        break;
      default:
        break;
    }
  }, []);
  // Case 2
  const handleModalChangePack = useCallback(() => {}, []);
  // Case 3
  const handleModalRegisterPack = useCallback(() => {}, []);
  // Case 4
  const handleNotEnoughRequirement = useCallback(() => {}, []);

  const handleModalPhoneCheck = useCallback(() => {
    modalPhoneCheck(handleRegistrantionRenewal);
  }, [handleRegistrantionRenewal]);
  const handleViewDetail = useCallback(() => {
    modalPackageDetail(handleModalPhoneCheck);
  }, [handleModalPhoneCheck]);

  return {
    handleViewDetail,
    handleModalPhoneCheck
  };
};
