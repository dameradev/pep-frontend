import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import Page from '../components/Page';

import { UserProvider } from '../contexts/userContext';

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
          <Page>
            <Component {...pageProps} />
          </Page>
        </UserProvider>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
