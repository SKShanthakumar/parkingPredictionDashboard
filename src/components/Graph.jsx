import { useContext } from "react";
import { DataContext } from "../DataContext";
import {
  LineChart, Line, XAxis, YAxis, Label, Legend, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';

export default function Graph() {
    const { data, deleteData } = useContext(DataContext)
    const lineKeys = Object.keys(data[0] || {}).filter(key => key !== "timestamp");

    if (!data || data.length === 0) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-2xl font-bold">No Data Available</h2>
                <p>Please select a station and vehicle type to view the graph.</p>
            </div>
        );
    }
    return (
        <div className="mt-10 w-4/5 mx-auto">
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(tick) => dayjs(tick).format('hh:mm')}
                    />
                    <YAxis>
                        <Label value="Available Slots" angle={-90} position="insideLeft" dy={50} />
                    </YAxis>
                    <Tooltip labelFormatter={(value) => dayjs(value).format("dddd, DD MMM YYYY, hh:mm A")} />
                    {lineKeys.map((key, index) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={`hsl(${(index * 80) % 360}, 70%, 50%)`}
                            strokeWidth={2}
                            dot={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
                {lineKeys.map((key, index) => (
                    <div className="relative group cursor-pointer" key={key}>
                    <div className="flex items-center gap-2 bg-gray-100 py-2 px-5 rounded-full hover:bg-gray-200 cursor-pointer">
                        <span
                            className="inline-block w-4 h-2 rounded"
                            style={{ backgroundColor: `hsl(${(index * 80) % 360}, 70%, 50%)` }}
                        />
                        <span className="text-sm">{key}</span>
                    </div>
                    <div onClick={(e) => {deleteData(key)}} className="absolute font-bold my-auto rounded-full top-0 h-full w-full opacity-0 group-hover:opacity-90 text-white px-2 bg-red-600 transition-opacity duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto relative top-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
}