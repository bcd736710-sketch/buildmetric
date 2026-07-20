import Script from "next/script";

type GoogleAnalyticsProps = {
  measurementId: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-loader"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){window.dataLayer.push(arguments);}
          window.gtag('js', new Date());
          window.gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            page_location: window.location.href,
            page_title: document.title
          });
        `,
        }}
      />
    </>
  );
}
