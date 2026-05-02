function WithoutNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" tabIndex={-1}>
      {children}
    </main>
  );
}

export default WithoutNavLayout;
