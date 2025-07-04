import PlantList from "./PlantList";
import Navbar from "./Navbar";

export default function Plants() {
    return (
        <>
            <Navbar />
            <div style={{ padding: "1rem" }}>
                <PlantList />
            </div>
        </>
    );
}
