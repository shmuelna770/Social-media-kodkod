import Header from "../comps/Header";
import Footer from "../comps/Footer";
import "../index.css"
import { Outlet } from "react-router";


export default function HomeFeed() {

  return (
    <div className="posts-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
