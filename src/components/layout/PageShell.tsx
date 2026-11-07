interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="flex-1 overflow-auto bg-[#f8f9fd] dark:bg-[#0b0f19] min-h-[calc(100vh-4.5rem)]">
      <div className="max-w-[1550px] mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </main>
  );
}
