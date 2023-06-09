import { INews } from '@/services/news/news';
import clsx from 'clsx';
import Link from 'next/link';
import { CustomProps } from '../../types/element-type';

type Props = CustomProps<INews> & {
  iShowButton?: boolean;
  classNameFrame?: string;
  classNameTitle?: string;
  classNameDes?: string;
  href?: string;
};

const CardNewsProduct = ({
  categories,
  des,
  id,
  image,
  date,
  name,
  className,
  iShowButton = true,
  classNameFrame,
  classNameTitle,
  classNameDes,
  href,
  ...rest
}: Props) => {
  return (
    <>
      <div className={clsx('group transition-default card overflow-hidden rounded-2xl', className)} {...rest}>
        <figure className={clsx(classNameFrame ? classNameFrame : 'aspect-video', 'overflow-hidden')}>
          <Link href={{ pathname: href || '/news/itel/[id]', query: { id: `${id}` } }}>
            <img
              src={image}
              alt="promotion image"
              className={clsx(!iShowButton && 'rounded-2xl', 'transition-default h-full w-full object-cover group-hover:scale-110')}
            />
          </Link>
        </figure>
        <div className="flex flex-col justify-between flex-1 gap-1 px-0 md:py-3 py-0 pt-3">
          <Link href={{ pathname: href || '/news/itel/[id]', query: { id: `${id}` } }}>
            <h5 className={clsx(classNameTitle, 'card-title justify-between gap-3 font-bold line-clamp-2 md:line-clamp-none')}>{name}</h5>
          </Link>
          <div className="card-actions flex-col justify-between">
            <div className={clsx(classNameDes, 'card-desc md:mt-1 flex items-center gap-1 text-sm')}>{des}</div>
            <div className="card-desc md:mt-1 flex items-center gap-1 text-sm">Tin iTel • {date}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardNewsProduct;
