import Header from "@/components/layout/Header/Header";
import TabBar from "@/components/layout/TabBar/TabBar";

function WithNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <TabBar />
    </>
  );
}

export default WithNavLayout;
