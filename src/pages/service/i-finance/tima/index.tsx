import { NextPage } from 'next';
import Head from 'next/head';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import SectionSupports from '@/components/section/section-supports';
import { Data } from '@/types/model';
import vouchersServices from '@/services/vouchers/vouchers';
import FooterDefault from '@/components/footer/default';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import CardVoucherHot from '@/components/card/card-voucher-hot';
import clsx from 'clsx';
import CardService from '@/components/card/card-service';
import CategoriesFilter from '@/components/sim/CategoriesFilter';
import FilterService from '@/components/service/FilterService';
import Svg from '@/components/icon/svg';
import { useRouter } from 'next/router';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};

const IFiranceTimePagge: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>
      <nav className="sticky top-0 bg-neutral-800 py-4.5 z-10 text-neutral-200">
        <div className="container flex items-center">
          <div className="flex-1 flex items-center">
            <button type="button" onClick={router.back}>
              <Svg src="/icons/line/chevron-left.svg" width={24} height={24} />
            </button>
            Trở về
          </div>
          <div className="flex-1 text-center text-[1.125rem]">
            <Svg src="/logo/logoTima.svg" className="h-8" />
          </div>
          <div className="flex-1 flex justify-end relative">
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
              6
            </div>
            <figure className="aspect-square w-12 rounded-full overflow-hidden">
              <img alt="" src="/images/apple.png" className="w-full h-full object-cover bg-neutral-0" />
            </figure>
          </div>
        </div>
      </nav>
      <div className="relative flex-col">
        <div className="aspect-tivi lg:hidden block">
          <img alt="" src="/service/bgTimaSmall.png" className="object-cover h-full w-full" />
        </div>
        <div className="lg:aspect-photo xl:aspect-cinema 2xl:aspect-[3/1.05] 3xl:aspect-section-banner hidden lg:block">
          <img alt="" src="/service/bgTima.png" className="object-cover h-full w-full" />
        </div>
        <div>
          <div className="text-neutral-0 absolute top-0 left-0 pt-[60px] pb-8 px-10 w-full h-full lg:py-[62px]">
            <div className="lg:container lg:grid lg:grid-cols-2">
              <div>
                <div className="">
                  <div className="">
                    <div className="w-[203px]">
                      <img src="/service/logoBannerTima.svg" className="w-full" alt="" />
                    </div>
                    <h1 className="2xl:text-[56px] text-5xl uppercase font-itel mt-8">
                      <b>ĐĂNG KÝ VAY NHANH</b>
                    </h1>
                    <p className="text-xl mt-2">Vay nhanh lãi mỏng, nhận tiền trong 2 giờ</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 mt-12">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      Chỉ cần giấy <b>đăng ký/cà vẹt xe máy</b>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      Vay <b>3 triệu - 42 triệu</b> trong 12 tháng
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      <b>Không thẩm định</b> nhà ở - nơi làm
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      <b>Không</b> chứng minh thu nhập
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      Lãi suất <b>1,5%/tháng</b> (18%/năm)
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 relative hidden lg:block rounded-[24px] text-neutral-800">
                <h1 className="text-2xl text-neutral-800 font-bold">Đăng ký vay ngay</h1>

                <div className="grid gap-8 mt-8">
                  <div>
                    <p className="text-sm text-neutral-800 mb-2">
                      Họ và tên: <b className="text-red-500">*</b>
                    </p>
                    <div className="flex gap-6 items-center">
                      <input
                        className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full"
                        placeholder="Nhập họ và tên "
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-800 mb-2">
                      Số điện thoại: <b className="text-red-500">*</b>
                    </p>
                    <div className="flex gap-6 items-center">
                      <input
                        className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-8 text-neutral-800">
                  <div>
                    <p className="text-sm text-neutral-800 mb-2">
                      Tỉnh/Thành phố: <b className="text-red-500">*</b>
                    </p>
                    <div className="flex gap-6 items-center">
                      <FilterService
                        className="border border-neutral-300 !rounded-lg bg-transparent text-base w-full p-[2px]"
                        label=""
                        classTitle="!text-neutral-400 font-normal"
                        title={'Chọn thành phố, địa điểm'}
                        list={['Hà Nội', 'HCM']}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-800 mb-2">
                      Quận/Huyện: <b className="text-red-500">*</b>
                    </p>
                    <div className="flex gap-6 items-center">
                      <FilterService
                        className="border border-neutral-300 !rounded-lg bg-transparent text-base w-full p-[2px]"
                        label=""
                        classTitle="!text-neutral-400 font-normal"
                        title={'Chọn quận/huyện'}
                        list={['Hà Nội', 'HCM']}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-8">
                  <button className="btn btn-primary px-28 rounded-full xl:py-5">Vay ngay</button>
                  <p className="text-neutral-500 text-sm mt-3">
                    Bấm VAY NGAY, bạn đã đồng ý với <b className="text-neutral-700">điều khoản và điều kiện</b> của Tima
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 py-12 bg-neutral-50 relative lg:hidden">
            <h1 className="text-[32px] text-neutral-800 font-bold">Đăng ký vay ngay</h1>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <p className="text-sm text-neutral-800 mb-2">
                  Họ và tên: <b className="text-red-500">*</b>
                </p>
                <div className="flex gap-6 items-center">
                  <input
                    className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full"
                    placeholder="Nhập họ và tên "
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-800 mb-2">
                  Số điện thoại: <b className="text-red-500">*</b>
                </p>
                <div className="flex gap-6 items-center">
                  <input
                    className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-800 mb-2">
                  Tỉnh/Thành phố: <b className="text-red-500">*</b>
                </p>
                <div className="flex gap-6 items-center">
                  <FilterService
                    className="border border-neutral-300 !rounded-lg bg-transparent text-base w-full p-[2px]"
                    label=""
                    classTitle="!text-neutral-400 font-normal"
                    title={'Chọn thành phố, địa điểm'}
                    list={['Hà Nội', 'HCM']}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-800 mb-2">
                  Quận/Huyện: <b className="text-red-500">*</b>
                </p>
                <div className="flex gap-6 items-center">
                  <FilterService
                    className="border border-neutral-300 !rounded-lg bg-transparent text-base w-full p-[2px]"
                    label=""
                    classTitle="!text-neutral-400 font-normal"
                    title={'Chọn quận/huyện'}
                    list={['Hà Nội', 'HCM']}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-8">
              <button className="btn btn-primary px-28 rounded-full">Vay ngay</button>
              <p className="text-neutral-500 text-sm mt-3">
                Bấm VAY NGAY, bạn đã đồng ý với <b className="text-neutral-700">điều khoản và điều kiện</b> của Tima
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16 bg-neutral-0 lg:py-20">
        <div className="px-4 md:px-10 text-center">
          <h1 className="md:text-5xl lg:text-[56px] text-[32px] uppercase text-neutral-800">
            <b>
              Ưu điểm về
              <br className="lg:hidden" /> dịch vụ của Tima
            </b>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-4">
            Chúng tôi chỉ hợp tác với các đối tác tài chính tốt nhất tại Việt Nam. Do đó, bạn có thể chắc chắn rằng khoản vay mà bạn sẽ nhận
            được đến từ một công ty uy tín.
          </p>
        </div>
        <div className="container mt-5 md:mt-16 md:px-10 pb-16 md:pt-0 lg:pb-0">
          <div className="grid grid-cols-2 gap-10 px-10">
            <div className="flex flex-col items-center">
              <Svg src="/service/money.svg" className="w-14 h-14" />
              <b className="text-xl">Lãi suất tốt</b>
              <p className="text-sm text-neutral-500 text-center">Vay không cần thế chấp với lãi suất cạnh tranh</p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/service/moneyPink.svg" className="w-14 h-14" />
              <b className="text-xl">Đơn giản tiện lợi</b>
              <p className="text-sm text-neutral-500 text-center">Chỉ cần đăng ký online, hồ sơ đơn giản, giải ngân trong ngày</p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/service/moneyBlue.svg" className="w-14 h-14" />
              <b className="text-xl">Chi phí hợp lý</b>
              <p className="text-sm text-neutral-500 text-center">Tima tư vấn miễn phí, không thu bất cứ khoản chi phí nào trước khi vay</p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/service/moneyDark.svg" className="w-14 h-14" />
              <b className="text-xl">Nhận khoản vay</b>
              <p className="text-sm text-neutral-500 text-center">
                tima là đơn vị hàng đầu kết nối hơn 20.000 đối tác cho vay trên toàn quốc
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16 lg:pt-20 bg-neutral-100">
        <div className="px-4 md:px-10 text-center">
          <h1 className="md:text-5xl text-[32px] uppercase text-neutral-800">
            <b>Thông tin và chính sách</b>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-4">
            Chúng tôi chỉ hợp tác với các đối tác tài chính tốt nhất tại Việt Nam. Do đó, bạn có thể chắc chắn rằng khoản vay mà bạn sẽ nhận
            được đến từ một công ty uy tín.
          </p>
        </div>
        <div className="container mt-5 md:mt-14 md:px-10 pb-4 md:pt-0">
          <div className="md:mt-10 grid md:gap-6 gap-3 lg:grid-cols-3 lg:grid-rows-2">
            {vouchers.data.slice(0, 3).map((voucher, i) => (
              <CardService
                isLayoutTop
                desc="Tết đến, Vexere sale thả ga, giảm đến 50% khi đặt vé tại Vexere"
                title={voucher.title}
                classNameTitle={clsx('line-clamp-2 text-xl', i === 0 && 'text-2xl')}
                key={voucher.id}
                className={clsx(i === 0 && 'col-span-2 row-span-2', i > 0 && 'rounded-xl')}
                classNameFrame={clsx(i === 0 ? 'lg:aspect-photo md:aspect-video' : 'aspect-video', 'rounded-2xl', i > 0 && 'rounded-xl')}
                img={voucher.img}
                classNameDesc="!text-base"
                isHideDesc={i > 0}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-16 lg:py-20 bg-neutral-0">
        <div className="px-4 md:px-10 text-center">
          <h1 className="md:text-5xl text-[32px] uppercase text-neutral-800">
            <b>Quy TRÌNH VAY 4 BƯỚc</b>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-4">Vay nhanh, lãi mỏng, nhận tiền trong 2 giờ</p>
        </div>
        <div className="container mt-5 md:mt-16 md:px-10 pb-16 md:pt-0 lg:pb-0">
          <div className="grid grid-cols-2 gap-10 px-10">
            <div className="flex flex-col items-center">
              <Svg src="/service/money.svg" className="w-14 h-14" />
              <b className="text-xl">1. Đăng ký vay</b>
              <p className="text-sm text-neutral-500 text-center">
                Hoàn tất điền thông tin
                <br className="lg:hidden" /> trong 30 giây
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/service/moneyPink.svg" className="w-14 h-14" />
              <b className="text-xl">2. Chuẩn bị hồ sơ</b>
              <p className="text-sm text-neutral-500 text-center">
                Giấy đăng ký xe máy <br className="lg:hidden" />
                hoặc Giấy đăng ký ô tô
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/service/moneyBlue.svg" className="w-14 h-14" />
              <b className="text-xl">3. Xét duyệt</b>
              <p className="text-sm text-neutral-500 text-center">
                Nhận kết quả nhanh chóng <br className="lg:hidden" />
                sau khi gửi hồ sơ
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/service/moneyDark.svg" className="w-14 h-14" />
              <b className="text-xl">4. Nhận khoản vay</b>
              <p className="text-sm text-neutral-500 text-center">
                Nhận tiền qua
                <br className="lg:hidden" /> tài khoản ngân hàng
              </p>
            </div>
          </div>
        </div>
      </div>
      <SectionSupports />
      <FooterDefault className="bg-neutral-0" />
      <ChatBoxLazy />
    </>
  );
};

IFiranceTimePagge.displayName = 'IFiranceTimePagge';

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchers = await vouchersServices.getListVoucher({ limit: 10 });
  const vouchersForYou = await vouchersServices.getListVoucher({ limit: 4 });
  return {
    props: {
      vouchers,
      vouchersForYou
    },
    revalidate: 8600
  };
});

export default IFiranceTimePagge;
export { getStaticProps };
