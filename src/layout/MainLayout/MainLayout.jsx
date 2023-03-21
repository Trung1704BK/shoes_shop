import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
function MainLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div style={{ minHeight: "500px" }}>{children}</div>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;
