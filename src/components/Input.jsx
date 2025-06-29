import axios from "axios";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

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
    const [stationName, setStationName] = useState("");
    const [vehicleType, setVehicleType] = useState("0");
    const [days, setDays] = useState(1);

    const { setData, reqBody, setReqBody } = useContext(DataContext) 

    async function getData(e){
        e.preventDefault();
        if (stationName === "") {
            alert("Please select a station name.");
            return;
        }

        const newReqBody = {
            stations: [...reqBody.stations, {
                station_name: stationName,
                vehicle_type: vehicleType
            }],
            days: days
        }

        setReqBody(newReqBody);
     
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/available`, newReqBody);
        setData(data);
    }

    return (
        <form onSubmit={(e) => getData(e)} className="grid grid-cols-5 w-5/6 mx-auto gap-3 justify-center items-end">
            <div className="col-span-2">
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
            <div className="col-span-1">
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
            <div className="col-span-1">
                <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Number of Days
                </label>
                <input id="days" type="number" onChange={(e) => {setDays(e.target.value)}} value={days} className="border border-gray-300 w-full shadow-sm rounded-md p-1" />
            </div>
            <div className="col-span-1">
            <button
                className="bg-primary shadow-sm rounded-md w-full px-10 py-1.5 text-white font-semibold"
                type="submit"
                >View</button>
            </div>
        </form>
    );
}