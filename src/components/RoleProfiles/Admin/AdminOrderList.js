import React, { useEffect, useState } from "react";
import { db } from "../../Authentication/firebase";
import { collection, getDocs } from "firebase/firestore";
import AdminNavbar from "./AdminNavbar";
import "../../../styles/adminOrders.css";

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Orders"));
                const orderData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(orderData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="orders-container">
                <h2 className="orders-title">All Orders</h2>
                {loading ? (
                    <p className="orders-empty">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="orders-empty">No orders found.</p>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="order-card">
                            <p className="order-number">
                                <span className="label">Order ID:</span> {order.id}
                            </p>
                            <p>
                                <span className="label">Email:</span> {order.email}
                            </p>
                            <p>
                                <span className="label">Date:</span>{" "}
                                {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                            </p>
                            <p>
                                <span className="label">Total:</span> {order.total.toFixed(2)} €
                            </p>
                            <ul className="order-items">
                                {order.items.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-price">{item.price} €</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default AdminOrderList;
