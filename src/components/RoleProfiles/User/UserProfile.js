import { useEffect, useState } from "react";
import { auth, db } from "../../Authentication/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar/Navbar";
import "../../../styles/profile.css";

function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    console.log("User data not found");
                }
            } else {
                console.log("User is not logged in");
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/login";
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    return (
        <div>
            <Navbar />
            {userDetails ? (
                <div className="user-profile-container">
                    <h1 className="welcome-text">Welcome {userDetails.firstName}</h1>
                    <div className="user-info">
                        <h2 className="welcome-subtext">
                            Welcome to your profile. Here you can see details and manage your account.
                        </h2>
                        <p>
                            <span className="label-bold">Email:</span> {userDetails.email}
                        </p>
                        <p>
                            <span className="label-bold">First Name:</span> {userDetails.firstName}
                        </p>
                        <p>
                            <span className="label-bold">Last Name:</span> {userDetails.lastName}
                        </p>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <p style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</p>
            )}
        </div>
    );
}

export default UserProfile;