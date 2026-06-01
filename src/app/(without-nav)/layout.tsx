import Header from "@/components/layout/Header/Header";

function WithoutNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header showActions={false} />
      <main id="main-content" className="mainContent withoutNav" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}

export default WithoutNavLayout;
