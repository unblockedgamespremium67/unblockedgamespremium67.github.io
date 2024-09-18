import NextApp from 'next/app';
import Head from 'next/head';

import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';

import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getSidePosts } from 'lib/posts';
import { getCategories } from 'lib/categories';
import NextNProgress from 'nextjs-progressbar';
import { getAllMenus } from 'lib/menus';

import 'styles/globals.scss';
import 'styles/wordpress.scss';
import variables from 'styles/_variables.module.scss';
import Script from 'next/script';
import { useState } from 'react';
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from 'lib/apollo-client';
import PrivacyBox from 'components/PrivacyBox';
import Link from 'next/link';
import Image from 'next/image';

function App({ Component, pageProps = {}, metadata, recentPosts, categories, menus, sidePosts }) {
  const [isNavOpen, setisNavOpen] = useState();
  const [isPrivacyOpen = true, setisPrivacyOpen] = useState();
  const apolloClient = getApolloClient();

  function toggleNav() {
    setisNavOpen(!isNavOpen);
  }

  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
    menus,
    sidePosts,
    isNavOpen,
    setisNavOpen,
    toggleNav,
    isPrivacyOpen,
    setisPrivacyOpen,
  });

  return (
    <ApolloProvider client={apolloClient}>
      <SiteContext.Provider value={site}>
        <SearchProvider>
          <NextNProgress height={4} color={variables.progressbarColor} />
          <Head>
            <meta name="google-site-verification" content="zVS51G9qsrXjF_p5P-xZD1xC1HtpsPypwR0o1pqtXkU" />
          </Head>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PHD37JG2C4" />
          <Script id="gtm" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-PHD37JG2C4');
              `}
          </Script>
          <Component {...pageProps} />

          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(d,s){d.getElementById("licntE007").src=
"https://counter.yadro.ru/hit?t44.18;r"+escape(d.referrer)+
((typeof(s)=="undefined")?"":";s"+s.width+"*"+s.height+"*"+
(s.colorDepth?s.colorDepth:s.pixelDepth))+";u"+escape(d.URL)+
";h"+escape(d.title.substring(0,150))+";"+Math.random()})
(document,screen)
              `}
          </Script>
          <Link
            href="https://www.liveinternet.ru/click"
            target={'_blank'}
            style="position:absolute;z-index:-100;transform:translate(-100%);"
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

          {isPrivacyOpen && <PrivacyBox />}
        </SearchProvider>
      </SiteContext.Provider>
    </ApolloProvider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
    queryIncludes: 'archive',
  });

  const { sidePosts } = await getSidePosts();

  const { categories } = await getCategories({
    count: 5,
  });

  const { menus = [] } = await getAllMenus();

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    recentPosts,
    categories,
    menus,
    sidePosts,
    isNavOpen: false,
  };
};

export default App;
