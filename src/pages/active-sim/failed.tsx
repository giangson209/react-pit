import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface PageProps {}
const Page = (props: PageProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Itel - Chi tiết giao dịch</title>
      </Head>
      <HeaderMobileWeb title="Chi tiết giao dịch" />
      <div className="bg-neutral-0 px-4 pt-6 md:pt-10 pb-8 md:pb-20 text-center">
        <div className="w-[512px] xl:w-[560px] max-w-full mx-auto">
          <div className="mx-auto w-20 h-20">
            <Svg className="w-full h-full" src="/icons/others/payment-failed.svg" />
          </div>

          <p className="font-bold text-xl md:text-2xl mt-3 md:mt-6">Gửi yêu cầu thất bại!</p>
          <p className="text-sm mt-1 md:mt-2 text-neutral-500">
            Hệ thống đang bảo trì, Bạn vui lòng thử lại sau ít phút.
            <br />
            iTel rất xin lỗi về sự bất tiện này!
          </p>

          <div className="border-t border-t-neutral-200 my-6" />

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <p className="text-left text-sm text-neutral-500">Chức năng sử dụng</p>
            <p className="text-right text-sm md:text-base font-bold">Kích hoạt Sim</p>
            <p className="text-left text-sm text-neutral-500">Thời gian sử dụng</p>
            <p className="text-right text-sm md:text-base font-bold">16:50 - 01/03/2023</p>
            <p className="text-left text-sm text-neutral-500">Trạng thái</p>
            <p className="text-right text-sm md:text-base font-bold">Thất bại</p>
          </div>

          <div className="border-t border-t-neutral-200 my-6" />

          <div className="flex gap-4">
            <button type="button" className="block flex-1 btn-secondary btn rounded-full" onClick={() => router.push('/')}>
              Về trang chủ
            </button>
            <button type="button" className="block flex-1 btn-primary btn rounded-full">
              Thử lại
            </button>
          </div>

          <p className="mt-8 font-bold">Yêu cầu hỗ trợ</p>
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
