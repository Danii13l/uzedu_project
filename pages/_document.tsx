import { Html, Head, Main, NextScript } from "next/document";
import Document, { DocumentContext, DocumentInitialProps } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }



  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta name="description" content="uzedu" />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <body>
     
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;