import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Empty, Typography } from "antd";
import "./App.css";
import Header from "./components/Header/Header";
import ToDoItemEditor, {
    InputValues,
} from "./components/ToDoItemEditor/ToDoItemEditor";
import ToDoList from "./components/ToDoList/ToDoList";
import {
    ToDoItemActionKind,
    ToDoItemsContex,
} from "./contexts/toDoItemContext";
import ToDoItem from "./models/toDoItem";
import ToDoItemUpdate from "./models/toDoItemUpdate";

function App() {
    const [width, setWidth] = useState(30);

    const [editorError, setEditorError] = useState(false);

    const { state, dispatch } = useContext(ToDoItemsContex);

    const [currentToDo, setCurrentToDo] = useState<ToDoItem | null>(
        state.currentToDoItem
    );

    const handleDrag = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            const w =
                ((e.clientX -
                    e.currentTarget.parentElement!.getBoundingClientRect()
                        .left) /
                    e.currentTarget.parentElement!.getBoundingClientRect()
                        .width) *
                100;
            if (w > 0 && w !== width) {
                setWidth(w);
            }
        },
        [width]
    );

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setDragImage(new Image(), 0, 0);
    };

    const [toDoUpdateState, setToDoUpdateState] = useState<
        Partial<ToDoItemUpdate>
    >({});

    const handleInputValuesChange = (values: InputValues) => {
        setToDoUpdateState({
            id: state.currentToDoItem?.id,
            description: values.description,
            statusId: values.statusId,
            title: values.title,
        });
    };

    const handleOnSave = () => {
        fetch("https://localhost:7148/api/ToDoItems", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toDoUpdateState),
        })
            .then((response) => {
                return response.json();
            })
            .then((data: any) => {
                dispatch({
                    type: ToDoItemActionKind.TODO_UPDATED,
                    payload: data,
                });
            });
    };

    const handleOnDiscard = () => {
        setCurrentToDo({ ...currentToDo! });
    };

    useEffect(() => {
        setCurrentToDo(state.currentToDoItem);
    }, [state.currentToDoItem]);

    return (
        <div className="container">
            <Header />
            <main>
                <div className="mainContent">
                    <div
                        className="resizable todoListWrapper"
                        style={{ width: `${width}%` }}
                    >
                        <ToDoList />
                    </div>
                    <div
                        className="draggable"
                        draggable
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        style={{ maxWidth: "10px" }}
                    />
                    <div
                        className="resizable todoItemDetailsWrapper"
                        style={{ width: `${100 - width}%` }}
                    >
                        {currentToDo && (
                            <>
                                <ToDoItemEditor
                                    inputValues={currentToDo}
                                    onInputValuesChange={
                                        handleInputValuesChange
                                    }
                                    setError={setEditorError}
                                />
                                <div className="actionButtons">
                                    <Button
                                        onClick={handleOnSave}
                                        type="primary"
                                        disabled={editorError}
                                    >
                                        Save
                                    </Button>
                                    <Button onClick={handleOnDiscard}>
                                        Discard
                                    </Button>
                                </div>
                            </>
                        )}

                        {!currentToDo && (
                            <Empty
                                imageStyle={{ height: 100 }}
                                description={
                                    <Typography.Text>
                                        You haven't selected any task yet
                                    </Typography.Text>
                                }
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
