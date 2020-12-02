import Head from 'next/head';

const Meta = (props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,300&display=swap"
        rel="stylesheet"
      />
      <title>Platform for Erasmus Projects</title>
      <meta
        name="description"
        content="Find the perfect erasmus project with our platform, and have the best erasmus+ experience of your life"
      />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default Meta;
