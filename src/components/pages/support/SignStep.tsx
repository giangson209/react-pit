import CheckBox from '@/components/form/CheckBox';

import { FC, useEffect, useRef, useState } from 'react';

const ContractView = () => {
  const refDiv: any = useRef(null);
  useEffect(() => {
    const _event = (e: any) => {
      // console.log('😡coh / file: SignStep.tsx:11 / e:', e.target.offsetHeight);
      // console.log('😡coh / file: SignStep.tsx:11 / e:', e.target.innerHeight);
      // console.log('😡coh / file: SignStep.tsx:11 / e:', e.target.scrollY);
      // console.log('😡coh / file: SignStep.tsx:11 / e:', e.target.scrollTop);
    };
    refDiv.current?.addEventListener?.('scroll', _event);
    return () => refDiv.current?.removeEventListener?.('scroll', _event);
  }, []);

  return (
    <div className="mt-6 md:mt-4 relative">
      <div ref={refDiv} className="overflow-x-auto max-h-[280px] md:max-h-[480px]">
        <div className="relative">
          <img src="/images/sign_image.png" alt="" className="w-full h-full" />
          <div className="flex justify-center items-center absolute bg-red-100 border border-red-500 border-dashed rounded-lg right-4 md:right-8 bottom-3 xl:right-12 xl:bottom-8 w-[154px] h-10 md:w-[264px] md:h-[88px] xl:w-[308px] xl:h-[104px]">
            <p className="text-red-500 text-xs md:text-sm">Bấm vào khung để ký *</p>
          </div>
        </div>
      </div>
      {/* <button type="button" className="block btn-primary btn rounded-full absolute bottom-0">
        Đến chỗ ký
      </button> */}
    </div>
  );
};

const SignStep: FC<{ submit: (v: any) => void }> = ({ submit }) => {
  const [accept, setAccept] = useState(false);
  return (
    <div>
      <div>
        <div className="flex items-center gap-2.5 md:gap-3.5">
          <CheckBox value={accept} onChange={setAccept} />
          <p className="text-sm flex-1 md:text-base">Tôi hiểu và đồng ý với các điều kiện dưới đây:</p>
        </div>

        <ul className="list-disc ml-4 text-xs mt-3  md:mt-4">
          <li>
            Việc thay đăng ký thông tin thuê bao trên hệ thống sẽ chỉ được thực hiện sau khi cung cấp đầy đủ các giấy tờ, thông tin theo quy
            định của pháp luật.
          </li>
          <li>
            Trong quá trình chờ và sau khi hoàn thành đăng ký thông tin trên hệ thống, nếu có xảy ra bất kỳ khiếu kiện, tranh chấp nào liên
            quan đến số thuê bao trên, tôi đồng ý để iTel thu hồi số thuê bao để giải quyết khiếu nại, đồng thời tôi cam kết sẽ phối hợp
            iTel để giải quyết và chịu hoàn toàn trách nhiệm trước pháp luật.
          </li>
          <li> Các thông tin và chữ ký của bạn sẽ được tự đồng điền vào Phiếu xác nhận thông tin thuê bao dưới đây.</li>
        </ul>

        <p className="text-sm flex-1 md:text-base mt-6 md:mt-4">Vui lòng đọc hợp đồng và ký tên của bạn tại phía dưới cùng của hợp đồng!</p>

        <ContractView />
      </div>
      <button disabled={!accept} type="button" className="block btn-primary btn rounded-full mx-auto mt-4 md:mt-10" onClick={submit}>
        Xác nhận & gửi yêu cầu
      </button>
    </div>
  );
};

export default SignStep;
