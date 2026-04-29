import { getServices } from "@/lib/supabase";
import Header from "@/app/components/Header";
import AdminNav from "@/app/_components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await getServices();
  return (
    <>
      <Header services={services} />
      <div className="pt-20 md:pt-32 min-h-screen bg-gray-50">
        <AdminNav />
        {children}
      </div>
    </>
  );
}
