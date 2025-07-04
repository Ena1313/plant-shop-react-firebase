import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Authentication/firebase";
import { useCart } from "../../../Context/CartContext";
import Navbar from "./Navbar";
import "../../../../styles/plantDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlantDetails() {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const docRef = doc(db, "Plants", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPlant(docSnap.data());
                } else {
                    console.log("Plant not found");
                    navigate("/plants");
                }
            } catch (error) {
                console.error("Error fetching plant details:", error);
            }
            setLoading(false);
        };

        fetchPlant();
    }, [id, navigate]);

    if (loading) return <p className="details-loading">Loading plant details...</p>;
    if (!plant) return <p className="details-loading">Plant not found.</p>;

    return (
        <>
            <Navbar />
            <div className="plant-details-container">
                <div className="plant-image-wrapper">
                    <img src={plant.imageUrl} alt={plant.name} className="plant-details-image" />
                </div>
                <div className="plant-info">
                    <h2 className="plant-name">{plant.name}</h2>
                    <p className="plant-description">{plant.description}</p>
                    <p className="plant-price">{plant.price.toFixed(2)} €</p>
                    <div className="plant-buttons">
                        <button onClick={() => navigate(-1)} className="btn-back">Go Back</button>
                        <button onClick={() => {
                            addToCart({ ...plant, id });
                            toast.success("Plant added to cart!");
                        }} className="btn-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlantDetails;
