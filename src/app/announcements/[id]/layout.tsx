export default function AnnouncementDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </div>
  );
}