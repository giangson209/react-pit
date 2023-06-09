import clsx from 'clsx';
import Link from 'next/link';
import { INavigationItem } from '.';
import Svg from '../icon/svg';

export const NavigationItem = (props: INavigationItem & JSX.IntrinsicElements['a']) => {
  return (
    <Link href={props.href} className={clsx('transition-default gap-3 rounded-md', props.className)} onClick={props.onClick}>
      {props.icon ? (
        <div className="menu-icon flex items-center justify-center">
          <Svg src={props.icon} className="h-8 w-8" />
        </div>
      ) : null}
      <div className="flex-1">
        <div className="font-bold">{props.title}</div>
        <p className="text-sm font-normal text-neutral-500">{props.description}</p>
      </div>
      <div className="menu-icon-arrow">
        <Svg src="/icons/line/arrow-right.svg" className="inline h-6 w-6 text-red-500" />
      </div>
    </Link>
  );
};
