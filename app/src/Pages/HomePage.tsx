import Banner from "@/components/Layout/Home/Banner";
import Problem from "@/components/Layout/Home/Problem";
import Navbar from "@/components/Navbar";

export default function HomePageLayout() {
  return (
    <main>
      <Navbar />
      <Banner />
      <Problem />
    </main>
  );
}
