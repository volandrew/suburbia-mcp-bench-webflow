import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// This layout's Header/Footer fetch from Webflow's CMS Data API at render time —
// force dynamic rendering so the build doesn't try to prerender it statically
// without a WEBFLOW_API_TOKEN available at build time.
export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
