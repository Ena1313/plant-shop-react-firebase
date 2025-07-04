import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../Authentication/firebase";
import "../../../styles/navbar.css";

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="navbar">
            <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Plants
            </NavLink>
            <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Orders
            </NavLink>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default AdminNavbar;
