import useOnClickOutside from '@/hooks/useOnClickOutside';
import Routers from '@/routes/routers';
import { INews } from '@/services/news/news';
import { Data } from '@/types/model';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useRef, useState } from 'react';
import CardNewsProduct from '../card/card-news-product';
import CardShort from '../card/card-short';
import Svg from '../icon/svg';
import PaginationList from '../pagination/pagination-list';
import SectionNews from '../section/section-news';
import SectionSupports from '../section/section-supports';

type DefaultProps = {
  shorts?: Data.Shorts;
  news?: INews[];
  titleNews?: string;
  haveShorts?: boolean;
  haveVideos?: boolean;
  haveHotNews?: boolean;
  hrefHotNews?: string;
  hrefVideoNews?: string;
  hrefItemVideo?: string;
  className?: string;
};
type Props = PropsWithChildren<DefaultProps & Omit<JSX.IntrinsicElements['main'], keyof DefaultProps>>;

export default function NewsContainer({
  children,
  shorts,
  news,
  titleNews = 'tin tức',
  haveShorts = true,
  haveVideos = true,
  haveHotNews = true,
  hrefHotNews,
  hrefVideoNews,
  hrefItemVideo,
  className
}: Props) {
  const tabs = [
    { id: 1, label: 'Tất cả', href: Routers.NEWS },
    { id: 2, label: 'Tin iTel', href: Routers.NEWS_ITEL },
    { id: 3, label: 'Tin hoạt động', href: Routers.NEWS_ACTIVE },
    { id: 4, label: 'Tin dịch vụ', href: Routers.NEWS_SERVICE },
    { id: 5, label: 'Video', href: Routers.NEWS_VIDEO }
  ];
  const router = useRouter();
  return (
    <div>
      <section>
        <SearchNews />
      </section>
      <div className="flex justify-center lg:gap-4">
        {tabs.map((tab, index) => (
          <Link key={index} href={tab.href}>
            <div
              className={`cursor-pointer whitespace-nowrap border-b-4 border-transparent px-8 py-6 text-xl font-bold ${
                router.pathname === tab.href ? 'border-b-red-300 text-neutral-0 bg-red-500' : ''
              }`}
            >
              {tab.label}
            </div>
          </Link>
        ))}
      </div>
      {haveHotNews && (
        <section className="bg-neutral-0 pt-16">
          <HotNews titleNews={titleNews} href={hrefHotNews} />
        </section>
      )}
      {haveShorts && (
        <section>
          <ShortNews shorts={shorts || { data: [], page: 1 }} />
        </section>
      )}
      {haveVideos && (
        <section>
          <VideoNews news={news || []} hrefItemVideo={hrefItemVideo} href={hrefVideoNews} />
        </section>
      )}
      <div className={className}>{children}</div>
      <section className="bg-neutral-0 pt-1 pb-16 ">
        <div className="md:block hidden">
          <PaginationList
            pageList={['1', '2', '3', '4', '...', '12', '13', '14', '15']}
            subPageList={['5', '6', '7', '8', '9', '10', '11']}
          />
        </div>
        <div className="md:hidden">
          <PaginationList pageList={['1', '2', '3', '...', '7']} subPageList={['5', '6']} />
        </div>
      </section>
      <section>
        <SectionSupports />
      </section>
    </div>
  );
}

const SearchNews = () => {
  const news = [
    {
      id: 1,
      name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
      href: '/news/active/1',
      category: 'Tin hoạt động'
    },
    {
      id: 2,
      name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
      href: '/news/itel/1',
      category: 'Tin iTel'
    },
    { id: 3, name: 'Chương trình mua Sim tặng quà', href: '/news/service/1', category: 'Tin dịch vụ' },
    { id: 4, name: 'Chương trình Quay số trúng thưởng', href: '/news/video/1', category: 'Video' },
    {
      id: 5,
      name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
      href: '/news/active/2',
      category: 'Tin hoạt động'
    },
    {
      id: 6,
      name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
      href: '/news/video/2',
      category: 'Video'
    },
    {
      id: 7,
      name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
      href: '/news/video/2',
      category: 'Video'
    },
    {
      id: 8,
      name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
      href: '/news/video/2',
      category: 'Video'
    },
    {
      id: 9,
      name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
      href: '/news/video/2',
      category: 'Video'
    }
  ];
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useOnClickOutside(ref, () => setIsFocus(false));

  const filteredNews =
    query === ''
      ? news
      : news.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <section className="relative bg-base-100 py-16">
      <img
        src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1683478876/itel/images/d3bf35944a37260733458a0119034973_hjc4dl.png"
        alt="banner_background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative container">
        <div className="font-itel text-neutral-0">
          <h2 className=" text-h4 lg:text-h3">
            Tin tức nóng hổi. trend mới nổi
            <br /> Khám phá ngay
          </h2>
        </div>
        <div className="mt-10 max-w-2xl">
          <div className="relative flex rounded-full bg-neutral-100" ref={ref}>
            <div className="flex w-16 flex-shrink-0 items-center justify-center ">
              <Svg src="/icons/bold/search.svg" className="inline h-6 w-6" />
            </div>
            <input
              placeholder="Tìm kiếm tin tức, video"
              className="peer w-full bg-transparent p-4 font-medium outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocus(true)}
            />
            {isFocus && (
              <div className="w-16 flex justify-center items-center hover:cursor-pointer" onClick={() => setQuery('')}>
                <Svg src="/icons/line/close.svg" className="inline h-6 w-6" />
              </div>
            )}
            {isFocus && (
              <div className="absolute top-full mt-2 bg-neutral-0 w-full rounded-lg p-2 shadow-itel z-10 max-h-[352px] overflow-scroll">
                {filteredNews.length > 0 ? (
                  filteredNews.map((item) => (
                    <Link key={item.id} href={item.href}>
                      <div className="hover:bg-neutral-100 hover:cursor-pointer p-4 rounded-lg truncate">
                        <strong>[{item.category}]</strong> {item.name}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="hover:bg-neutral-100 hover:cursor-pointer p-4 rounded-lg truncate">Không tìm thấy !</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const HotNews = ({ titleNews, href = '' }: { titleNews: string; href?: string }) => {
  const router = useRouter();
  const onClickGame = (id: string | number) => {
    if (href) {
      const url = href.replace('[id]', id.toString());
      router.push(url);
    }
  };

  return (
    <div className="container">
      <h3 className="text-h3 font-itel font-bold">
        {titleNews} <span className="text-primary">nổi bật</span>
      </h3>
      <div className="pt-10 pb-20 flex gap-6 flex-col xl:flex-row">
        <section className="w-full xl:w-2/3 hover:cursor-pointer relative" onClick={() => onClickGame(1)}>
          <div className="w-full overflow-hidden rounded-xl">
            <img
              className=" w-full hover:scale-110 transition-default aspect-photo"
              src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686026672/IGame_image/Block_Image_xhbaeb.png"
              alt=""
            />
          </div>
          <div className="lg:absolute mt-4">
            <h3 className="font-bold text-h-xs">Thông báo gia hạn chương trình mua sim mới tài lộc phơi phới</h3>
            <p className="text-[#666666]">Tin iTel • 09/03/2023</p>
          </div>
        </section>
        <section className="xl:flex-col w-full xl:w-1/3 hidden sm:flex justify-between gap-6 lg:gap-0">
          <div className="w-1/2 xl:w-full hover:cursor-pointer" onClick={() => onClickGame(2)}>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="aspect-cinema w-full hover:scale-110 transition-default"
                src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686026673/IGame_image/Block_Image_ptkwdo.png"
                alt=""
              />
            </div>
            <div className=" mt-2">
              <h3 className=" font-bold text-lg">Thần may mắn theo vào iTel mua </h3>
              <p className="text-[#666666]">Tin iTel • 09/03/2023</p>
            </div>
          </div>
          <div className="w-1/2 xl:w-full hover:cursor-pointer" onClick={() => onClickGame(3)}>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="aspect-cinema w-full hover:scale-110 transition-default"
                src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686026671/IGame_image/Block_Image_dlafbn.png"
                alt=""
              />
            </div>
            <div className=" mt-2">
              <h3 className=" font-bold text-lg">Thần may mắn theo vào iTel mua</h3>
              <p className="text-[#666666]">Tin iTel • 09/03/2023</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ShortNews = ({ shorts }: { shorts: Data.Shorts }) => {
  return (
    <div className="bg-neutral-0">
      <SectionNews title="shorts" classTitle="md:text-h4 text-xl" className="container py-4 md:py-10 xl:py-20" href="#">
        <div className="mt-3 md:mt-10 gap-3 grid md:hidden lg:grid lg:grid-cols-4 grid-flow-col overflow-auto md:gap-6">
          {shorts.data.slice(0, 4).map((short) => (
            <CardShort short={short} key={short.id} shorts={shorts} />
          ))}
        </div>
        <div className="mt-3 md:mt-10 gap-6 md:grid-cols-3 lg:hidden hidden md:grid">
          {shorts.data.slice(0, 3).map((short) => (
            <CardShort short={short} key={short.id} shorts={shorts} />
          ))}
        </div>
      </SectionNews>
    </div>
  );
};

const VideoNews = ({ news, hrefItemVideo, href = '#' }: { news: INews[]; hrefItemVideo?: string; href?: string }) => {
  return (
    <SectionNews classTitle="md:text-h4 text-xl" title="video hot" className="container py-4" href={href}>
      <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
        {news.map((item) => (
          <CardNewsProduct
            key={item.id}
            {...item}
            className="bg-neutral-0 rounded-xl"
            classNameFrame="rounded-xl aspect-video"
            classNameDes="hidden lg:block"
            href={hrefItemVideo}
          />
        ))}
      </div>
    </SectionNews>
  );
};
