import React, { useEffect, useState } from "react";
import { auth, db } from "../../../Authentication/firebase";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import Navbar from "./Navbar";
import "../../../../styles/orders.css";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const q = query(
                    collection(db, "Orders"),
                    where("userId", "==", user.uid)
                );

                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(data);
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
            <Navbar />
            {loading ? (
                <p className="orders-loading">Loading your order history...</p>
            ) : orders.length === 0 ? (
                <p className="orders-empty">You have no orders yet.</p>
            ) : (
                <div className="orders-container">
                    <h2 className="orders-title">Your Order History</h2>
                    {orders.map((order, index) => (
                        <div key={order.id} className="order-card">
                            <h4 className="order-number">Order #{index + 1}</h4>
                            <p className="order-line">
                                <span className="label">Date:</span> {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                            </p>
                            <p className="order-line">
                                <span className="label">Total:</span> {order.total.toFixed(2)} €
                            </p>
                            <ul className="order-items">
                                {order.items.map((item, i) => (
                                    <li key={i}>
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-price">{item.price} €</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default OrderHistory;
