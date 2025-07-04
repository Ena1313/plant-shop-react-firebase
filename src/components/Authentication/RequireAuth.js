import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

function RequireAuth({ children, roleRequired }) {
    const [checking, setChecking] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const role = docSnap.data().role;

                    if (!roleRequired || role === roleRequired) {
                        setHasAccess(true);
                    }
                }
            }
            setChecking(false);
        });

        return () => unsubscribe();
    }, [roleRequired]);

    if (checking) return <div>Loading...</div>;

    return hasAccess ? children : <Navigate to="/login" />;
}

export default RequireAuth;
