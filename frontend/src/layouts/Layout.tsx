import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../components/Heading";

interface props {
  children: React.ReactNode;
}

const Layout = ({ children }: props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Heading />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
