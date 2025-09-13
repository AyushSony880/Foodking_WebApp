import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import HeroPage from "../components/HeroPage";
import Menu from "../components/Menu";

function Home() {
  return (
    <div className=" scroll-smooth scrollbar-hide">
      <NavBar />
      <HeroPage />
      <Menu />
      <Footer />
    </div>
  );
}

export default Home;
