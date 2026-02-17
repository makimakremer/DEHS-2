import { Header, Footer } from "@/components/layout";
import { ScrollProgress } from "@/components/ui";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
