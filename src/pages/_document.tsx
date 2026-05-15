import { Head, Html, Main, NextScript } from 'next/document';
import Document from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

