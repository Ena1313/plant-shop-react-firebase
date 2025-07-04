import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../Authentication/firebase";
import { Link } from "react-router-dom";
import "../../../../styles/plants.css";

function PlantList() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Plants"));
                const plantData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPlants(plantData);
                setLoading(false);
                console.log(plantData)
            } catch (error) {
                console.error("Error fetching plants:", error);
            }
        };

        fetchPlants();
    }, []);

    if (loading) return <p>Loading plants...</p>;

    return (
        <div className="plants-container">
            <h2 className="plants-title">Our Plants</h2>
            <div className="plant-grid">
                {plants.map((plant) => (
                    <Link
                        to={`/plants/${plant.id}`}
                        key={plant.id}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div className="plant-card">
                            <img src={plant.imageUrl} alt={plant.name} className="plant-image" />
                            <h4>{plant.name}</h4>
                            <p className="plant-description">{plant.description}</p>

                            <p><strong>{plant.price} €</strong></p>
                            <p className="details-link">Details</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PlantList;
