import { NavLink } from "react-router-dom";
import "../../../../styles/navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                About
            </NavLink>
            <NavLink to="/plants" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Plants
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Profile
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Cart
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Orders
            </NavLink>
        </nav>
    );
};

export default Navbar;
