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
import { useState } from 'react';
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from 'lib/apollo-client';
import PrivacyBox from 'components/PrivacyBox';

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
          <Component {...pageProps} />
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
