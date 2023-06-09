type CardNumerlogyProps = {
  mainNumber: string;
  description: string;
};

const CardNumerlogy = ({ mainNumber, description }: CardNumerlogyProps) => {
  return (
    <div className="hover:bg-[url(/images/card-numerology-bg.png)] hover:bg-center cursor-pointer rounded-3xl border border-neutral-300 bg-overlay-popup/[0.5] hover:bg-cover px-6 py-8 hover:border-neutral-0 hover:font-medium xl:w-[18.75rem] md:w-[30%]">
      <div className="text-h1 text-center font-itel mb-2 text-neutral-0">{mainNumber}</div>
      <div className="text-center text-base font-normal text-neutral-0 line-clamp-3">{description}</div>
    </div>
  );
};

export default CardNumerlogy;
