interface MainLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export function MainLayout({ children, sidebar }: MainLayoutProps) {
  return (
    <div className="flex flex-1">
      {sidebar}
      <main className="flex-1">{children}</main>
    </div>
  );
}