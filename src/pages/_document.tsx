import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import { DMSansVN, Itel } from './_app';
import clsx from 'clsx';

export default function Document(props: DocumentProps) {
  return (
    <Html lang={props.locale} data-theme="light">
      <Head />
      <body className={clsx(DMSansVN.variable, Itel.variable, 'font-sans')}>
        <Main />
        <NextScript />
        <div id="__settings" />
        <div id="__tooltip" />
      </body>
    </Html>
  );
}
