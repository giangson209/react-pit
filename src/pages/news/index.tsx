import CardNewsProduct from '@/components/card/card-news-product';
import NewsContainer from '@/components/container/news';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import Tab from '@/components/tabs/tabs';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import newsService, { INews } from '@/services/news/news';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type PageProps = {
  shorts: Data.Shorts;
  news: INews[];
  newsList: INews[];
};
const tabs = [
  { id: 1, label: 'Tất cả', href: '/news/itel/[id]' },
  { id: 2, label: 'Tin iTel', href: '/news/itel/[id]' },
  { id: 3, label: 'Tin hoạt động', href: '/news/active/[id]' },
  { id: 4, label: 'Tin dịch vụ', href: '/news/service/[id]' }
];

const News: NextPage<PageProps> = ({ shorts, news, newsList }) => {
  const router = useRouter();
  const tabId = router.query.tab?.toString() || 1;

  useEffect(() => {
    if (!router.isReady) return;
    router.push(`/news?tab=${tabId}`, undefined, { shallow: true });
  }, [router.isReady, router.query.tab]);

  return (
    <NewsContainer shorts={shorts} news={news} hrefHotNews="/news/itel/[id]" className="bg-neutral-0 pt-20">
      <div className="container">
        <h2 className="md:font-itel flex-1 text-xl md:text-h4 font-bold xl:text-h3">Tin MỚI CẬP NHẬT</h2>
        <div className="flex items-center justify-start pt-4">
          {tabs.map((tab) => (
            <Tab
              className="flex-1 sm:flex-none text-center sm:text-left"
              key={tab.id}
              label={tab.label}
              onClick={() => router.push(`/news?tab=${tab.id}`, undefined, { shallow: true })}
              isActive={tabId == tab.id}
              size="small"
            />
          ))}
        </div>
        <AllNewsItems news={newsList} href={tabs.find((item) => item.id === tabId)?.href || ''} />
      </div>
    </NewsContainer>
  );
};

const AllNewsItems = ({ news, href }: { news: INews[]; href: string }) => {
  return (
    <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
      {news.map((item) => (
        <CardNewsProduct
          key={item.id}
          {...item}
          className="bg-neutral-0 rounded-xl"
          classNameFrame="rounded-xl aspect-video"
          classNameDes="hidden lg:block"
          href={href}
        />
      ))}
    </div>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const shorts = await vouchersServices.getListShort({ limit: 10 });
  const news = await newsService.getNews({ limit: 6 });
  const newsList = await newsService.getNews({ limit: 9 });
  return {
    props: { shorts, news, newsList },
    revalidate: 8600
  };
});

News.getLayout = LayoutWithChatBox;
export { getStaticProps };
export default News;
