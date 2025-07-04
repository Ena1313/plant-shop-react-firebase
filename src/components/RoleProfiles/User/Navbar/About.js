import Navbar from "./Navbar";
import "../../../../styles/about.css";

export default function About() {
    return (
        <>
            <Navbar />
            <div className="about-container">
                <div className="about-content">
                    <h2 className="about-title">About Us</h2>
                    <div className="about-text">
                        <p>
                            Welcome to our plant shop! We are passionate about bringing nature closer to your home and workspace. Our carefully curated selection of plants is chosen to suit every taste and environment, from low-maintenance greens to vibrant, flowering beauties.
                        </p>
                        <p>
                            Whether you're a seasoned gardener or a beginner, we're here to help you cultivate happiness and freshness with our plants. Explore our collections, learn about plant care, and let us inspire your green journey!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
