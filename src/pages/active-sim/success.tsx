import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface PageProps {}
const Page = (props: PageProps) => {
  const router = useRouter();
  const [star, setStar] = useState(6);

  return (
    <>
      <Head>
        <title>Itel - Chi tiết giao dịch</title>
      </Head>
      <HeaderMobileWeb title="Chi tiết giao dịch" />
      <div className="bg-neutral-0 px-4 pt-6 md:pt-10 pb-8 md:pb-20 text-center">
        <div className="w-[512px] xl:w-[560px] max-w-full mx-auto">
          <div className="mx-auto w-20 h-20">
            <Svg className="w-full h-full" src="/icons/others/payment-success.svg" />
          </div>
          <p className="font-bold text-xl md:text-2xl mt-3 md:mt-6">Kích hoạt Sim thành công</p>
          <p className="text-sm mt-1 md:mt-2 text-neutral-500">
            iTel đã tiếp nhận hồ sơ đăng kí TTTB và gửi kết quả trong 24h.
            <br />
            Hiện tại số thuê bao của Bạn đã sẵn sàng sử dụng.
            <br />
            Chi tiết LH 0877087087 (0đ cho thuê bao iTel). Trân trọng!
          </p>
          <div className="border-t border-t-neutral-200 my-6" />
          <p className="text-sm">Bạn kích hoạt SIM có dễ dàng không? Hãy đánh giá ngay bên dưới nhé.</p>

          <div className="flex justify-around mt-6 md:mt-8">
            {[1, 2, 3, 4, 5, 6, 7].map((v) => (
              <div key={v} className="w-8 h-8 cursor-pointer" onClick={() => setStar(v)}>
                <Svg className={clsx('w-full h-full', v <= star ? 'text-yellow-500' : 'text-neutral-300')} src="/icons/bold/star.svg" />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 md:mt-6">
            <p className="text-xs">Rất khó khăn</p>
            <p className="text-xs">Bình thường</p>
            <p className="text-xs">Rất dễ dàng</p>
          </div>
          <textarea
            className="mt-4 w-full rounded-lg border border-neutral-300 p-4 text-sm bg-transparent focus:border-neutral-800"
            rows={3}
            placeholder="Hãy góp ý cho chúng tôi để Bạn có trải nghiệm tốt hơn nhé!"
          />
          <div className="flex gap-4 mt-6">
            <button type="button" className="block flex-1 btn-secondary btn rounded-full">
              Tạo tài khoản iTel
            </button>
            <button type="button" className="block flex-1 btn-primary btn rounded-full" onClick={() => router.push('/')}>
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation(async () => {
  return {
    props: {}
  };
});
export { getStaticProps };

export default Page;
