import cumtaLogo from "../assets/cumta_logo.png";

export default function Navbar() {
    return (
        <div className="bg-white h-16 flex items-center px-4 shadow-md mb-8">
            <img
                src={cumtaLogo}
                alt="CUMTA Logo"
                className="h-12"
            />
        </div>
    );
}