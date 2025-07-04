import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "../../styles/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;

            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);

                const role = docSnap?.data()?.role || "user";
                toast.success(role === "admin" ? "Welcome admin!" : "Login successful!", {
                    position: "top-center"
                });
                window.location.href = role === "admin" ? "/admin" : "/profile";
            }
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        }
    };

    return (
        <div className="wrapper">
            <div className="imageSection"></div>
            <div className="formSection">
                <div className="formContent">
                    <h1 className="appTitle">Plant Shop</h1>
                    <h3 className="loginTitle">Login</h3>
                    <p className="loginSubtitle">Welcome back! Please log in to your account.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>

                        <p className="register">
                            New user <a href="/register">Register Here</a>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
