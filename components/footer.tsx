'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function Footer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/js/main.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container">
      <div className="copyright text-center">
        <p>
          &copy; <span>Copyright</span>{' '}
          <strong className="px-1 sitename">iPortfolio</strong>{' '}
          <span>All Rights Reserved</span>
        </p>
        Inspired by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        
             {/* <!-- Vendor JS Files --> */}
             <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
             <Script src="/vendor/php-email-form/validate.js"></Script>
             <Script src="/vendor/aos/aos.js"></Script>
             <Script src="/vendor/typed.js/typed.umd.js"></Script>
             <Script src="/vendor/purecounter/purecounter_vanilla.js"></Script>
             <Script src="/vendor/waypoints/noframework.waypoints.js"></Script>
             <Script src="/vendor/isotope-layout/isotope.pkgd.min.js"></Script>
             <Script src="/vendor/imagesloaded/imagesloaded.pkgd.min.js"></Script>
             <Script src="/vendor/glightbox/js/glightbox.min.js"></Script>
             <Script src="/vendor/swiper/swiper-bundle.min.js"></Script>
      </div>
    </div>
  );
}