import Script from "next/script";

export default function Footer () {
    return (
        <>
            <div className="container">
                <div className="copyright text-center ">
                    <p>© <span>Copyright</span> <strong className="px-1 sitename">iPortfolio</strong> <span>All Rights Reserved</span></p>
                </div>
                <div className="credits">
                    {/* <!-- All the links in the footer should remain intact. -->
                    <!-- You can delete the links only if you've purchased the pro version. -->
                    <!-- Licensing information: https://bootstrapmade.com/license/ -->
                    <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] --> */}
                    Inspired by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </div>
            {/* <!-- Vendor JS Files --> */}
            {/* <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script> */}
            {/* <Script src="/vendor/php-email-form/validate.js"></Script> */}
            <Script src="/vendor/aos/aos.js"></Script>
            <Script src="/vendor/typed.js/typed.umd.js"></Script>
            <Script src="/vendor/purecounter/purecounter_vanilla.js"></Script>
            {/* <Script src="/vendor/waypoints/noframework.waypoints.js"></Script> */}
            {/* <Script src="/vendor/isotope-layout/isotope.pkgd.min.js"></Script> */}
            {/* <Script src="/vendor/imagesloaded/imagesloaded.pkgd.min.js"></Script> */}
            {/* <Script src="/vendor/glightbox/js/glightbox.min.js"></Script> */}
            {/* <Script src="/vendor/swiper/swiper-bundle.min.js"></Script> */}

            {/* <!-- Main JS File --> */}
            <Script src="/js/main.js"></Script>
            <Script src=""></Script>
        </>
    );
}