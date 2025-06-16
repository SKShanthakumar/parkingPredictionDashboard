import { useState } from "react";

const stations = [
    "AG-DMS",
    "Anna Nagar East",
    "Anna Nagar Tower",
    "Arignar Anna Alandur ",
    "Arumbakkam",
    "Ashok Nagar",
    "Chennai International Airport",
    "Ekkattuthangal",
    "Egmore",
    "Government Estate",
    "Guindy",
    "High Court",
    "Kaladipet Metro",
    "Kilpauk",
    "Koyambedu",
    "LIC",
    "Little Mount",
    "Mannadi",
    "Meenambakkam",
    "Nandanam",
    "Nehru Park",
    "New Washermenpet Metro",
    "OTA - Nanganallur Road",
    "Pachaiyappas College",
    "Puratchi Thalaivar Dr. M.G. Ramachandran Central",
    "Saidapet",
    "Shenoy Nagar",
    "St. Thomas Mount",
    "Teynampet",
    "Thirumangalam",
    "Thiruvotriyur Metro",
    "Thiruvotriyur Theradi Metro",
    "Thiagaraya College Metro",
    "Thousand Lights",
    "Tollgate Metro",
    "Tondiarpet Metro",
    "Vadapalani",
    "Washermanpet",
    "Wimco Nagar Depot Metro",
    "Wimco Nagar Metro"
];

export default function Input() {
    const [stationName, setStationName] = useState("n");
    const [vehicleType, setVehicleType] = useState("0");

    function log(e){
        e.preventDefault();
        if (stationName === "") {
            alert("Please select a station name.");
            return;
        }
        console.log("Selected Station:", stationName);
        console.log("Selected Vehicle Type:", vehicleType);
    }

    return (
        <div className="flex gap-3 justify-center items-end">
            <div className="w-80">
                <label htmlFor="station" className="text-sm font-medium text-gray-700 mb-1">
                    Select Station Name
                </label>
                <select
                    id="station"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    value={stationName}
                    onChange={e => setStationName(e.target.value)}
                >
                    <option value="">-- Select --</option>
                    {stations.map((station, idx) => (
                        <option key={idx} value={station}>{station}</option>
                    ))}
                </select>
            </div>
            <div className="w-80">
                <label htmlFor="vehicle" className="text-sm font-medium text-gray-700 mb-1">
                    Select Vehicle Type
                </label>
                <select
                    id="vehicle"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    value={vehicleType}
                    onChange={e => setVehicleType(e.target.value)}
                >
                    <option value="0">Two Wheeler</option>
                    <option value="1">Four Wheeler</option>
                </select>
            </div>
            <button
                className="bg-primary rounded-md w-48 h-fit py-2 text-white font-semibold"
                onClick={(e) => log(e)}
                >Search</button>
        </div>
    );
}