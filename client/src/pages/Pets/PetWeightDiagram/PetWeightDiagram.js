import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

import { format } from 'date-fns';

const formatDate = (date) => {
    return format(date, 'dd.MM.yyyy'); 
};

const MyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0];
        return (
            <div className="custom-tooltip">
                <p>{`Data: ${formatDate(label)}`}</p>
                <p>{`Waga: ${dataPoint.value}`}</p>
            </div>
        );
    }
    return null;
};

const PetWeightChart = ({ data }) => {
    return (
        <LineChart width={220} height={150} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"}
                tickFormatter={formatDate} />
            <YAxis />
            <Tooltip content={<MyTooltip />} />
            <Legend />
            <Line
                type="monotone"
                dataKey="weight"
                name="waga"
                stroke="orange" 
                strokeWidth={3} 
                dot={{ stroke: 'orange', fill: 'orange', strokeWidth: 2 }} 
            />
        </LineChart>
    );
};

export default PetWeightChart;
