import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const getServerPropsWithTranslation = function <PageProps extends { [key: string]: any } = { [key: string]: any }>(
  getStaticProps?: GetStaticProps<PageProps>,
  namespacesRequired: string[] = []
): GetStaticProps<PageProps> {
  if (!getStaticProps)
    return async (context) => {
      return { props: (await serverSideTranslations(context.locale ?? 'vi', ['common', 'footer', ...namespacesRequired])) as any };
    };
  return async (context) => {
    const response = await getStaticProps(context);
    if ('props' in response) {
      return {
        ...response,
        props: {
          ...(await serverSideTranslations(context.locale ?? 'vi', ['common', 'footer', ...namespacesRequired])),
          ...response.props
        }
      };
    } else return response;
  };
};

export default getServerPropsWithTranslation;
