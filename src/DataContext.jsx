import { useEffect, useState } from "react";
import { createContext } from "react";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [reqBody, setReqBody] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data.availability)) {
            const formattedData = normalizeData(data.availability);
            setData(formattedData);
        }
    }, [data]);

    const capitalize = (str) => {
      return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    const normalizeData = (rawData) => {
        const merged = {};
        
        rawData.forEach(({ station, vehicle, availability }) => {
            const key = `${capitalize(station)} - ${capitalize(vehicle)}`;
            availability.forEach(({ timestamp, available }) => {
            if (!merged[timestamp]) {
                merged[timestamp] = { timestamp };
            }
            merged[timestamp][key] = available;
            });
        });
        
        // Convert merged object to sorted array by timestamp
        return Object.values(merged).sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
    }
    
    const deleteData = (keyToRemove) => {
        const filtered = data.map(obj => {
            const { [keyToRemove]: _, ...rest } = obj;
            return rest;
        });
        setData(filtered);

        let [ stationName, vehicleType] = keyToRemove.split(" - ");
        if (vehicleType === "Two Wheeler")
            vehicleType = "0";
        else
            vehicleType = "1";

        if (stationName === "Arignar Anna Alandur")
            stationName = "Arignar Anna Alandur ";

        const newReqBody = reqBody.filter(
            (item) =>
            !(item.station_name === stationName && item.vehicle_type === vehicleType)
        );
        setReqBody(newReqBody);
        };

    return (
        <DataContext.Provider value={{ data, setData, reqBody, setReqBody, deleteData }}>
            {children}
        </DataContext.Provider>
    )
}