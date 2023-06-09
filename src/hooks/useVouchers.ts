import { Model } from '@/types/model';
import { randomBetween } from '@/utilities/number';
import { generateRandomSKU, stringToASCII } from '@/utilities/string';
import React, { useEffect, useState } from 'react';

type Props = {};

const names = [
  'Giảm 10% mùa hè',
  'Chương trình mùa hè',
  'Ưu đãi sinh nhật',
  'Giảm giá Black Friday',
  'Khuyến mãi đặc biệt',
  'Chương trình tháng ưu đãi',
  'Deal cuối tuần',
  'Giảm 5% mua thẻ',
];
type State = { ids: number[]; byId: Record<number, Model.DiscountCode & { q: string }> };
const useVouchers = (props: Props) => {
  const [vouchers, setVouchers] = useState<State>({ ids: [], byId: {} });

  useEffect(() => {
    const discountCodes: Model.DiscountCode[] = Array.from({ length: 12 }).map((_, id) => {
      const isFixed = Math.random() > 0.5 ? true : false;
      const expires_at = new Date();
      expires_at.setDate(expires_at.getDate() + 1);
      return {
        id: id + 1,
        code: generateRandomSKU(8),
        is_fix: isFixed,
        discount_amount: isFixed ? randomBetween(1, 5) * 40_000 : randomBetween(5, 20),
        minimum_order_amount: randomBetween(1, 8) * 5_000_000,
        maximum_discount_amount: isFixed ? 0 : randomBetween(5, 10) * 20_000,
        expires_at: expires_at.toISOString(),
        image:
          'https://s3-alpha-sig.figma.com/img/4048/e85d/784308c1c65fafb58b00c215f71d4c42?Expires=1685923200&Signature=HIviXo3jkZe9zukOtWi0ocsFRpvDL1JvBAPqf2wly3KFPSqiElpUCc-HsuIa2emEYg6CscBdj6EyhAFZuxWkQeZ62JGc2bsWO6D0AfZgTD0Wx79XkFRgP8UG2q5Ko3OhoTKYMTTfV-X2m-5lM0oWRCfO5BwbVZiMaNU~XPKe-obfbxwJSA8X4N3XkYSjJvsaWBIFP0h2wRb7UiYCFJgnsvbuynYp38Kj3-CJ5aPE2DbLyKqV~X-nh2O4jXoPT8O~ez0VewT5QXFYe0hm0Ljav~ZQRrp6BDObu0ASyiSTzjt8x~JgkpRgLKoIXA6nasrAKwVzMHu-9YyQANCFLOPOcA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        max_uses: 999,
        max_uses_user: 2,
        name: names[Math.floor(Math.random() * names.length)],
        uses: 0
      };
    });
    setVouchers(
      discountCodes.reduce(
        (object: State, voucher) => {
          object.ids.push(voucher.id);
          object.byId[voucher.id] = Object.assign(voucher, { q: stringToASCII(voucher.name).toLowerCase() });
          return object;
        },
        { ids: [], byId: {} }
      )
    );
  }, []);

  return vouchers;
};

export default useVouchers;
