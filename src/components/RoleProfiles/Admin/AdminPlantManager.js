import React, { useEffect, useState, useRef } from "react";
import { db } from "../../Authentication/firebase";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import "../../../styles/adminPlants.css";

function AdminPlantManager() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPlant, setEditingPlant] = useState(null);

    const nameRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const imageUrlRef = useRef();

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Plants"));
                const plantData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPlants(plantData);
            } catch (error) {
                console.error("Error fetching plants:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlants();
    }, []);

    if (loading) return <p>Loading plants...</p>;

    const handleDelete = async (plant) => {
        try {
            await deleteDoc(doc(db, "Plants", plant.id));
            setPlants((prev) => prev.filter((p) => p.id !== plant.id));
            console.log("Deleted plant:", plant.name);
        } catch (error) {
            console.error("Error deleting plant:", error);
        }
    };

    const openAddModal = () => {
        setEditingPlant(null);
        setShowModal(true);
    };

    const openEditModal = (plant) => {
        setEditingPlant(plant);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = nameRef.current.value.trim();
        const description = descRef.current.value.trim();
        const price = parseFloat(priceRef.current.value);
        const imageUrl = imageUrlRef.current.value.trim();

        if (!imageUrl) {
            alert("Please enter an image URL.");
            return;
        }

        try {
            if (editingPlant) {
                // Update plant
                const plantDocRef = doc(db, "Plants", editingPlant.id);
                await updateDoc(plantDocRef, { name, description, price, imageUrl });

                setPlants((prev) =>
                    prev.map((p) =>
                        p.id === editingPlant.id ? { ...p, name, description, price, imageUrl } : p
                    )
                );
                console.log("Updated plant:", name);
            } else {
                // Add new plant
                const newPlant = { name, description, price, imageUrl };
                const docRef = await addDoc(collection(db, "Plants"), newPlant);
                setPlants((prev) => [...prev, { id: docRef.id, ...newPlant }]);
                console.log("Added new plant:", name);
            }

            nameRef.current.value = "";
            descRef.current.value = "";
            priceRef.current.value = "";
            imageUrlRef.current.value = "";

            setEditingPlant(null);
            setShowModal(false);

        } catch (error) {
            console.error("Error submitting plant:", error);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2 className="admin-title">Admin – Manage Plants</h2>

            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <button className="btnAdd" onClick={openAddModal}>
                    Add New Plant
                </button>
            </div>

            {/* MODAL FOR ADDING/EDITING PLANT */}
            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <h3 style={{ marginBottom: "1rem" }}>
                            {editingPlant ? "Edit Plant" : "Add New Plant"}
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                ref={nameRef}
                                required
                                className="form-control"
                                defaultValue={editingPlant ? editingPlant.name : ""}
                            />
                            <textarea
                                placeholder="Description"
                                ref={descRef}
                                required
                                className="form-control"
                                defaultValue={editingPlant ? editingPlant.description : ""}
                            />
                            <input
                                type="number"
                                placeholder="Price (€)"
                                ref={priceRef}
                                required
                                className="form-control"
                                defaultValue={editingPlant ? editingPlant.price : ""}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                ref={imageUrlRef}
                                required
                                className="form-control"
                                defaultValue={editingPlant ? editingPlant.imageUrl : ""}
                            />
                            <div className="modal-button-group">
                                <button type="submit">
                                    {editingPlant ? "Save Changes" : "Submit"}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingPlant(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* PLANT LIST */}
            <div className="admin-plant-grid">
                {plants.map((plant) => (
                    <div key={plant.id} className="admin-plant-card">
                        <img src={plant.imageUrl} alt={plant.name} className="admin-plant-image" />
                        <h4>{plant.name}</h4>
                        <p className="admin-plant-description">{plant.description}</p>
                        <p className="admin-plant-price">{plant.price} €</p>
                        <div className="admin-button-group">
                            <button className="btn btn-outline-primary btn-sm" onClick={() => openEditModal(plant)}>
                                Edit
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(plant)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPlantManager;

const modalOverlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalStyle = {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
};
