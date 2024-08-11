import { Button, Modal } from "antd";
import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./NewToDoModal.css";
import ToDoItemEditor, { InputValues } from "../ToDoItemEditor/ToDoItemEditor";
import ToDoItemCreate from "../../models/toDoItemCreate";
import {
    ToDoItemActionKind,
    ToDoItemsContex,
} from "../../contexts/toDoItemContext";

interface NewToDoModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewToDoModal({ isOpen, setIsOpen }: NewToDoModalProps) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [editorError, setEditorError] = useState(false);

    const initialToDo: ToDoItemCreate = {
        title: "New Task",
        statusId: 1,
        description: "",
    };

    const [newToDo, setNewToDo] = useState<ToDoItemCreate>(initialToDo);
    const [init, setInit] = useState<ToDoItemCreate>(initialToDo);
    const { state, dispatch } = useContext(ToDoItemsContex);

    const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
        setConfirmLoading(true);
        fetch("https://localhost:7148/api/ToDoItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newToDo),
        })
            .then((response) => {
                setIsOpen(false);
                setConfirmLoading(false);
                return response.json();
            })
            .then((data: any) => {
                dispatch({
                    type: ToDoItemActionKind.TODO_ITEM_ADDED,
                    payload: data,
                });
            });
        setNewToDo(initialToDo);
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setNewToDo(initialToDo);
        setIsOpen(false);
    };

    const handleInputValuesChange = (values: InputValues) => {
        setNewToDo(values);
    };

    return (
        <>
            <Modal
                destroyOnClose={true}
                open={isOpen}
                title="Create new Task"
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleOk}
                        disabled={editorError}
                    >
                        Add
                    </Button>,
                ]}
            >
                <div className="modalContent">
                    <ToDoItemEditor
                        inputValues={init}
                        onInputValuesChange={handleInputValuesChange}
                        setError={setEditorError}
                    />
                </div>
            </Modal>
        </>
    );
}

export default NewToDoModal;
