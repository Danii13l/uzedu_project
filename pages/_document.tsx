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
                    <meta charSet="utf-8" />
                    <link rel="icon" href="/images/favicon.ico" />
                </Head>

                <body>
                    <div id="sidebar_menu"></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
