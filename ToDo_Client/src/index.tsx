import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StatusProvider } from "./contexts/statusContext";
import { ToDoItemProvider } from "./contexts/toDoItemContext";
import { ConfigProvider, theme } from "antd";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: "#5A54F9",
                },
            }}
        >
            <ToDoItemProvider>
                <StatusProvider>
                    <App />
                </StatusProvider>
            </ToDoItemProvider>
        </ConfigProvider>
    </React.StrictMode>
);
