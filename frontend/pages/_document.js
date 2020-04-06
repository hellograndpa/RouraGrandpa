/** @format */

import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import BootstrapProvider from '@bootstrap-styled/provider';
import myTheme from '../theme/theme';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <BootstrapProvider theme={myTheme}>
          <Head>{this.props.styleTags}</Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </BootstrapProvider>
      </html>
    );
  }
}
