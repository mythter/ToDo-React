import { createContext, useState, useEffect, ReactNode } from "react";

import Status from "../models/status";

interface StatusContextValue {
    statuses: Status[];
}

const initialValue: StatusContextValue = {
    statuses: [],
};

export const StatusContext = createContext<StatusContextValue>(initialValue);

interface DataProviderProps {
    children: ReactNode;
}

export function StatusProvider({ children }: DataProviderProps) {
    const [statuses, setStatuses] = useState<StatusContextValue>(initialValue);

    useEffect(() => {
        fetch("https://localhost:7148/api/Statuses")
            .then((response) => response.json())
            .then((data) => setStatuses({statuses: data}));
    }, []);

    return (
        <StatusContext.Provider value={statuses}>
            {children}
        </StatusContext.Provider>
    );
}
