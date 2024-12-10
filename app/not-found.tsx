export default function NotFound() {
  return (
    <div className="container mx-auto flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground">
          We couldn&apos;t find the page you&apos;re looking for.
        </p>
      </div>
    </div>
  );
}