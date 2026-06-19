import Header from "@/components/layout/Header/Header";
import TabBar from "@/components/layout/TabBar/TabBar";

function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="" className="subLayout" tabIndex={-1}>
        {children}
      </main>
      <TabBar />
    </>
  );
}

export default SubLayout;
