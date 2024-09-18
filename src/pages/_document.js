/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';

// Via https://github.com/vercel/next.js/blob/canary/examples/with-react-helmet/pages/_document.js

export default class MyDocument extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() };
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    const headComp = Object.keys(this.props.helmet)
    .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
    .map((el) => this.props.helmet[el].toComponent());

    return headComp;
  }

  render() {
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetHeadComponents}
        </Head>
        <Script
          id="gtm"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PHD37JG2C4"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('gtm loaded')
          }}
        />
        <Script
          id="gtmCounter"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('gtm loaded')
          }}
        >
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-PHD37JG2C4');
              `}
        </Script>

        <Script id="livecounter" strategy="afterInteractive">
          {`
              (function(d,s){d.getElementById("licntE007").src="https://counter.yadro.ru/hit?t44.18;r"+escape(d.referrer)+((typeof(s)=="undefined")?"":";s"+s.width+"*"+s.height+"*"+(s.colorDepth?s.colorDepth:s.pixelDepth))+";u"+escape(d.URL)+";h"+escape(d.title.substring(0,150))+";"+Math.random()})(document,screen)
            `}
        </Script>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
          <Link
            href="https://www.liveinternet.ru/click"
            target={'_blank'}
            style={{
              position: "absolute",
              zIndex: "-100",
              transform: "translate(-100%)",
            }}
          >
            <Image
              id={'licntE007'}
              priority
              src={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAIBTAA7'}
              alt="alt"
              width="31"
              height="31"
            />
          </Link>
        </body>
      </Html>
    );
  }
}
