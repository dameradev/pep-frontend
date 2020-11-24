import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import Page from '../components/Page';

import { UserProvider } from '../contexts/userContext';
import { CountriesProvider } from '../contexts/CountriesContext';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, pathname }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.pathname = pathname;
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <UserProvider>
          <CountriesProvider>
            <Page>
              <Component {...pageProps} />
            </Page>
          </CountriesProvider>
        </UserProvider>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
