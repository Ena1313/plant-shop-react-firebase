import AdminPlantManager from "./AdminPlantManager";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
    return (
        <>
            <AdminNavbar />
            <div className="container mt-5">
                <AdminPlantManager />
            </div>
        </>
    );
};

export default AdminDashboard;
