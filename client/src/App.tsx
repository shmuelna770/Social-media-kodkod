import Header from "./comps/Header";
import Footer from "./comps/Footer";
import HomeFeed from "./pages/HomeFeed";

export default function App() {
  return (
    <div className="posts-container">
      <Header />
      <HomeFeed />
      <Footer />
    </div>
  );
}
