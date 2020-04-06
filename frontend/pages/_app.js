/** @format */

import App, { Container } from 'next/app';
import Page from '../components/layout/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import BootstrapProvider from '@bootstrap-styled/provider';
import myTheme from '../theme/theme';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    console.log(ctx);
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
