import { getServices } from "@/lib/supabase";
import Header from "./Header";

export default async function NavHeader() {
  const services = await getServices();
  return <Header services={services} />;
}
