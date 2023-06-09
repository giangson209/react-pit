import { NextPage } from 'next';
import { Logger } from '@/utilities/logger';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import React from 'react';
import newsService, { INews } from '@/services/news/news';
import _ from 'lodash';
import { Model } from '@/types/model';
import LayoutDefault from '@/components/layout/layout-default';
import Link from 'next/link';
import Routers from '@/routes';
import Head from 'next/head';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import CardNewsProduct from '@/components/card/card-news-product';
import SectionSupports from '@/components/section/section-supports';

type PageProps = {
  category: Model.INewsCategory;
  news?: INews;
  similarNews?: INews[];
};

const tags = ['Hướng dẫn', 'Mua Sim', 'Sim mới', 'Tin hot', 'Chương trình hot'];

const logger = new Logger('INew Detail Page');
const INewsDetail: NextPage<PageProps> = ({ router, category, news, similarNews }) => {
  return (
    <div className="news-detail bg-neutral-0">
      <section className="container max-md:hidden">
        <div className="breadcrumbs text-sm text-neutral-500">
          <ul aria-label="Breadcrumb line-clamp-1 ">
            <li>
              <Link href={Routers.IMALL}> Trang chủ </Link>
            </li>
            <li>
              <Link href={Routers.NEWS}>Tin tức</Link>
            </li>
            <li>
              <Link href={_.get(Routers, category.routeName)}>{category.name}</Link>
            </li>
            <li className="text-neutral-800 line-clamp-1 ">
              <Link href={router.asPath}>
                <p className="line-clamp-1 ">{news?.name}</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="container flex py-10 gap-10">
        <div className="description w-full xl:w-2/3 text-neutral-500">
          <p className="text-base">Tin iTel • 09/03/2023</p>
          <h2 className="font-bold text-2xl md:text-[32px] xl:text-[40px] text-neutral-800 mb-2">
            Thông báo gia hạn chương trình mua sim mới tài lộc phơi phới
          </h2>
          <p className="text-base mb-4">
            Lấy việc giúp đỡ người khác làm mục tiêu sống, đồng cảm với nỗi đau khổ, mất mát của người khác...
          </p>

          <iframe
            src="https://www.youtube.com/embed/oc8Xs--IncM"
            title="Itel Vision2 Series with Jak Roberto | Itel Mobile Philippines"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full aspect-video rounded-2xl mb-4"
          ></iframe>
          <p className="text-sm mb-6 text-center">Khám phá chương trình mua sim tại iTel</p>

          <h3 className="text-neutral-800 text-xl font-bold mb-4">Sim đẹp trên iTel</h3>
          <p className="text-base mb-6">
            iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp tìm
            kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp cho bạn nhé
          </p>

          <h3 className="text-neutral-800 text-xl font-bold mb-4">Bước 1. Tìm kiếm Sim bằng search và bộ lọc</h3>
          <p className="text-base mb-4">
            iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp tìm
            kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp cho bạn nhé.{' '}
          </p>
          <p className="text-base mb-6">
            iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp tìm
            kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp cho bạn nhé. iTel có vô
            vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp tìm kiếm Sim
            phù hợp với bạn trở nên dễ dàng hơn bao giờ hết.
          </p>
          <iframe
            src="https://www.youtube.com/embed/oc8Xs--IncM"
            title="Itel Vision2 Series with Jak Roberto | Itel Mobile Philippines"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full aspect-video rounded-2xl mb-4"
          />
          <p className="text-sm mb-6 text-center">Khám phá chương trình mua sim tại iTel</p>
          <h3 className="text-neutral-800 text-xl font-bold mb-4">Thông báo gia hạn chương trình mua sim mới tài lộc phơi phới</h3>
          <p className="text-base mb-6">
            iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp tìm
            kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp cho bạn nhé. iTel có vô
            vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp tìm kiếm Sim
            phù hợp với bạn trở nên dễ dàng hơn bao giờ hết.{' '}
          </p>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <div key={tag} className="rounded-3xl border border-neutral-300 px-3 md:px-4 py-2 md:py-3 cursor-pointer text-neutral-800">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="ads hidden xl:flex md:w-1/3 rounded-2xl overflow-hidden relative h-fit">
          <img src="/images/banner-ads-sim.png" alt="banner" className="w-full h-full cover" />
          <div className="absolute top-0 left-0 p-8 h-full">
            <h3 className="font-bold text-[32px] text-neutral-800 mb-2">Bạn đã sẵn sàng chọn số, mua Sim?</h3>
            <p className="text-sm xl:text-base text-neutral-500 mb-8">Cùng Anh iTel đi liền thôiiiiii! Gét gô</p>

            <button type="button" className="btn btn-lg rounded-full btn-primary py-4 px-14">
              Gét gô!
            </button>
          </div>
        </div>
      </section>
      <div className="bg-neutral-50 py-4 md:py-20">
        <section className="container">
          <div className="flex items-center">
            <h2 className="md:font-itel flex-1 text-xl md:text-h4 font-bold xl:text-h3 text-center">Tin tức liên quan</h2>
          </div>
          <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
            {similarNews?.map((item, index) => (
              <CardNewsProduct
                key={item.id}
                {...item}
                className={`bg-neutral-50 rounded-xl ${index > 1 ? 'max-xl:hidden' : ''}`}
                classNameFrame="rounded-xl aspect-video"
                classNameDes="hidden lg:block"
              />
            ))}
          </div>
        </section>
      </div>
      <div className="max-xl:hidden">
        <SectionSupports />
      </div>
    </div>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const categoryPath = _.get(params, 'detail[0]');
  const newsId = _.get(params, 'detail[1]');

  const category = newsService.getCategoryByPath(categoryPath as string);
  const news = newsService.getNewsDetailById(newsId as string);
  const similarNews = await newsService.getNews({ limit: 3 });

  if (!category || !news || !similarNews) return { notFound: true };

  return {
    props: {
      category: category,
      news: news,
      similarNews: similarNews
    }
  };
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { detail: ['itel', '1'] } }],
    fallback: 'blocking' // can also be true or 'blocking'
  };
}

INewsDetail.getLayout = function getLayout(page, props) {
  return (
    <>
      <LayoutDefault isHomePage footerClassName="bg-neutral-0">
        <Head>
          <title>{`News - ${props.category.name}`}</title>
        </Head>
        {page}
      </LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
export default INewsDetail;

export { getStaticProps };
