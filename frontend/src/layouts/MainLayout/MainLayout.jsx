import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const MainLayout = () => {
    return (
        <div style={{minHeight: 100 + "vh"}}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout
