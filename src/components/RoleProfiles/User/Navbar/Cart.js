import { useCart } from "../../../Context/CartContext";
import { db, auth } from "../../../Authentication/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import "../../../../styles/cart.css";

function Cart() {
    const { cartItems, removeFromCart, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <div className="empty-cart">
                    <h3 className="cart-empty">Your cart is empty.</h3>
                </div>
            </>
        );
    }

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            toast.warning("Your cart is empty!");
            return;
        }

        try {
            const user = auth.currentUser;
            if (!user) {
                toast.error("You must be logged in to place an order");
                return;
            }

            const orderData = {
                userId: user.uid,
                email: user.email,
                items: cartItems,
                total: cartItems.reduce((acc, item) => acc + item.price, 0),
                createdAt: new Date(),
            };

            await addDoc(collection(db, "Orders"), orderData);

            clearCart();
            localStorage.removeItem("cart");
            toast.success("Order placed successfully!");
        } catch (error) {
            toast.error("Failed to place order. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="cart-container">
                <h2 className="cart-title">Shopping Cart</h2>
                <ul className="cart-list">
                    {cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-price">{item.price} €</div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="btn btn-danger cart-remove-btn"
                            >
                                Remove
                            </button>
                        </li>

                    ))}
                </ul>
                <div className="cart-total">
                    <p>Total: <strong>{cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)} €</strong></p>
                </div>

                <div className="cart-buttons">
                    <button className="btn btn-success" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                    <button className="btn btn-outline-danger" onClick={clearCart}>
                        Clear Cart
                    </button>
                </div>
            </div>
        </>
    );
}

export default Cart;
