function WithoutNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="mainContent" tabIndex={-1}>
      {children}
    </main>
  );
}

export default WithoutNavLayout;
