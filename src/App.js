import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Authentication/login";
import SignUp from "./components/Authentication/register";
import Profile from "./components/RoleProfiles/User/UserProfile";
import AdminDashboard from "./components/RoleProfiles/Admin/AdminDashboard";
import RequireAuth from "./components/Authentication/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/Authentication/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./components/Authentication/firebase";
import About from "./components/RoleProfiles/User/Navbar/About";
import Plants from "./components/RoleProfiles/User/Navbar/Plants";
import Cart from "./components/RoleProfiles/User/Navbar/Cart";
import PlantDetails from "./components/RoleProfiles/User/Navbar/PlantDetails";
import { CartProvider } from "./components/Context/CartContext";
import OrderHistory from "./components/RoleProfiles/User/Navbar/OrderHistory";
import AdminOrderList from "./components/RoleProfiles/Admin/AdminOrderList";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "Users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({ ...user, role: userData.role });
          } else {
            setUser({ ...user, role: "user" });
          }
        } catch (error) {
          console.error("Greška pri dohvaćanju role:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/profile" /> : <Login />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/profile"
              element={
                <RequireAuth roleRequired="user">
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth roleRequired="admin">
                  <AdminDashboard />
                </RequireAuth>
              }
            />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrderList />} />

            <Route path="/about" element={<About />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/plants/:id"
              element={
                <RequireAuth roleRequired="user">
                  <PlantDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/orders"
              element={
                <RequireAuth roleRequired="user">
                  <OrderHistory />
                </RequireAuth>
              }
            />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;