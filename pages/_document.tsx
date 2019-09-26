import React from 'react';
import NextDocument, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
