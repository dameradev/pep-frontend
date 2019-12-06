import Head from "next/head";

const Meta = props => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <script
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-ufkApsYu5oKF4y4afg5ZCWbaaUyjTYY&libraries=places"
      ></script>
      {/* <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>  */}
      <title>Sick Fits!</title>
    </Head>
  );
};

export default Meta;
