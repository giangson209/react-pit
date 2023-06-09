import NewsContainer from '@/components/container/news';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import vouchersServices from '@/services/vouchers/vouchers';
import newsService, { INews } from '@/services/news/news';
import { Data } from '@/types/model';
import { NextPage } from 'next';
import SectionNews from '@/components/section/section-news';
import CardNewsProduct from '@/components/card/card-news-product';

type PageProps = {
  shorts: Data.Shorts;
  news: INews[];
};

const ITelNews: NextPage<PageProps> = ({ shorts, news }) => {
  return (
    <NewsContainer shorts={shorts} news={news} haveVideos={false} titleNews="tin itel" hrefHotNews="/news/itel/[id]">
      <ITelNewsItems news={news} />
    </NewsContainer>
  );
};

const ITelNewsItems = ({ news }: { news: INews[] }) => {
  return (
    <SectionNews haveFilter classTitle="md:text-h4 text-xl" title="tin itel" className="container py-4">
      <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
        {news.map((item) => (
          <CardNewsProduct
            key={item.id}
            {...item}
            className="bg-neutral-0 rounded-xl"
            classNameFrame="rounded-xl aspect-video"
            classNameDes="hidden lg:block"
          />
        ))}
      </div>
    </SectionNews>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const shorts = await vouchersServices.getListShort({ limit: 10 });
  const news = await newsService.getNews({ limit: 9 });
  return {
    props: { shorts, news },
    revalidate: 8600
  };
});

ITelNews.getLayout = LayoutWithChatBox;
export { getStaticProps };
export default ITelNews;
