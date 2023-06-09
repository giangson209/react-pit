import clsx from 'clsx';
import Svg from '../icon/svg';
import { FC } from 'react';
import Link from 'next/link';

interface Props {
  className?: string;
}

const QUESTIONS = [
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '',
    url: ''
  },
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '',
    url: ''
  },
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '',
    url: ''
  },
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '',
    url: ''
  },
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '',
    url: ''
  },
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '',
    url: ''
  }
];

const SectionQuestions: FC<Props> = ({ className }) => {
  return (
    <div className={clsx('bg-neutral-0', className)}>
      <div className="container py-6 md:py-20">
        <h3 className="text-left md:text-center text-xl md:text-h-md font-itel">Câu hỏi thường gặp</h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-10">
          {QUESTIONS.map((item, index) => (
            <Link href={item.url} key={index} className="flex rounded-xl bg-neutral-100 overflow-hidden col-span-1">
              <div className="min-w-[112px] w-[112px] h-[112px] md:min-w-[136px] md:w-[136px] md:h-[136px]">
                <Svg className="w-full h-full" src="/images/question.svg" />
              </div>
              <div className="flex flex-col py-6 px-3 md:px-6 h-full justify-center">
                <p className="text-neutral-500 text-sm md:text-base">{item.title}</p>
                <p className="mt-1 text-sm md:text-xl font-bold">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SectionQuestions;
