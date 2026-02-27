/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-page-custom-font */
// app/head.tsx
export default function Head() {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      {/* Favicons */}
      <link rel="icon" href="/img/favicon.png" />
      <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Ubuntu:wght@300;400;500;700&family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Vendor CSS */}
      {/* <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" /> */}
      {/* <link href="/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" /> */}
      <link href="/vendor/aos/aos.css" rel="stylesheet" />
      {/* <link
        href="/vendor/glightbox/css/glightbox.min.css"
        rel="stylesheet"
      /> */}
      {/* <link
        href="/vendor/swiper/swiper-bundle.min.css"
        rel="stylesheet"
      /> */}

      {/* Main CSS */}
      <link href="/css/main.css" rel="stylesheet" />
    </head>
  );
}
