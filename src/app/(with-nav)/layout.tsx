import Script from "next/script";
import Header from "@/components/layout/Header/Header";
import TabBar from "@/components/layout/TabBar/TabBar";

function WithNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="afterInteractive"
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <TabBar />
    </>
  );
}

export default WithNavLayout;
