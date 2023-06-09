import React from 'react';
import CardGiftSelect from '../card/card-gift-select';

type Props = {};

const DropdownGiftSelector = (props: Props) => {
  return (
    <div className="space-y-4 px-6 py-4">
      <p className="font-bold">Chọn quà tặng</p>
      <div>
        <CardGiftSelect title="12312" price={99_999} discountPrice={0} />
      </div>
      {/* <div>
        <div className="card flex-row gap-x-3 bg-neutral-50 p-3 text-sm">
          <div className="w-12">
            <div className="card-image block-img block-square">
              <img src={itemImage} alt={itemName} className="rounded-lg object-cover" />
            </div>
          </div>
          <div>
            <p>{itemName}</p>
            {itemDesc && <p className="truncate font-medium">{itemDesc}</p>}
          </div>
        </div>
      </div>
      {withLink && (
        <div>
          <p className="font-bold">Đường dẫn</p>
          <div className="mt-2 flex w-full gap-x-2 rounded-lg border border-neutral-300 p-4">
            <p className="truncate text-subtle-content">{href}</p>
            <button type="button" onClick={handleCopy}>
              <Svg src="/icons/bold/copy.svg" width={24} height={24} />
            </button>
          </div>
        </div>
      )}
      <div>
        <p className="font-bold">Chia sẻ đến</p>
        <ul className="mt-2 flex gap-x-3">
          {socials.map(({ name, icon }) => {
            return (
              <li key={name}>
                <button type="button" className="p-1" data-target={name} data-href={href} onClick={handleShare}>
                  <Svg width={32} height={32} src={icon} />
                </button>
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default DropdownGiftSelector;
