import Head from 'next/head';

const Meta = (props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <script
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-ufkApsYu5oKF4y4afg5ZCWbaaUyjTYY&libraries=places"
      ></script>
      {/* <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>  */}
      <title>Youth Network</title>
    </Head>
  );
};

export default Meta;
