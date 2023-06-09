import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';

import StepCheckout from '@/components/pages/checkout/step-checkout';
import StepResult from '@/components/pages/checkout/step-result';
import Routers from '@/routes/routers';
import Link from 'next/link';

type CartPageProps = {};

const CheckoutPage: NextPage<CartPageProps> = ({ router }) => {
  const { t } = useTranslation('common');
  const [orderResult, setOrderResult] = useState<any>();
  const data = useAppSelector((state) => state.cart.checkoutBuyCode);

  const title = t('checkout');
  return (
    <>
      <Head>
        <title>{`Itel - ${title}`}</title>
      </Head>
      {!data && (
        <div className="h-64 center-by-grid">
          <div className="text-center">
            <h1 className="text-h1 font-itel container font-bold">Đi đúng flow mới ra màn này nhé</h1>
            <div>
              <Link className="btn btn-primary btn-lg rounded-full w-32 mt-4" href={Routers.HOME}>
                Về
              </Link>
            </div>
          </div>
        </div>
      )}
      {!orderResult && data && <StepCheckout data={data} onDone={setOrderResult} />}
      {orderResult && <StepResult />}
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation();

export default CheckoutPage;
export { getStaticProps };
