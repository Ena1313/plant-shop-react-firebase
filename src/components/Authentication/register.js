import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    photo: "",
                    role: "user",
                });
            }
            toast.success("User Registered Successfully!!", { position: "top-center" });
            navigate("/login");
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        }
    };

    return (
        <div className="wrapper">
            <div className="formSection">
                <div className="formContent">
                    <h1 className="appTitle">Plant Shop</h1>
                    <h3 className="loginTitle">Register</h3>
                    <p className="loginSubtitle">Create your account</p>

                    <form onSubmit={handleRegister} className="loginForm">
                        <div className="form-group">
                            <label>First name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                onChange={(e) => setFname(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary">
                            Sign Up
                        </button>
                    </form>

                    <p className="register">
                        Already registered? <a href="/login">Login</a>
                    </p>

                </div>
            </div>
            <div className="imageSection"></div>
        </div>
    );
}

export default Register;
