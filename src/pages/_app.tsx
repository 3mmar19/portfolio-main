import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { trackPageView, initScrollTracking, trackWebVitals } from '@/utils/analytics';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Initialize scroll depth tracking
    initScrollTracking();
    
    // Track web vitals
    trackWebVitals();

    // Track page views
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
