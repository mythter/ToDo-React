import { useContext, useEffect, useState } from "react";
import statusColorMapping from "../../helpers/mappings/statusColorMapping";
import ToDoItem from "../../models/toDoItem";
import NeonCircle from "../NeonCircle/NeonCircle";
import "./ToDoListItem.css";
import { Trash } from "phosphor-react";
import { Modal } from "antd";
import {
    ToDoItemActionKind,
    ToDoItemsContex,
} from "../../contexts/toDoItemContext";

interface ToDoListItemProps {
    toDo: ToDoItem;
    onItemClick: (toDo: ToDoItem) => void;
}

function ToDoListItem({ toDo, onItemClick }: ToDoListItemProps) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const { state, dispatch } = useContext(ToDoItemsContex);

    useEffect(() => {
        if (state.currentToDoItem?.id === toDo.id){
            setIsSelected(true);
        }
        else{
            setIsSelected(false);
        }
    }, [state.currentToDoItem, toDo])

    const handleDeleteOnClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleOnCancel = () => {
        setOpen(false);
    };

    const handleOnOk = () => {
        setConfirmLoading(true);
        fetch(`https://localhost:7148/api/ToDoItems/${toDo.id}`, {
            method: "DELETE",
        })
            .then((response) => {
                setOpen(false);
                setConfirmLoading(false);
                return response.json();
            })
            .then((data: any) => {
                dispatch({
                    type: ToDoItemActionKind.TODO_DELETED,
                    payload: data,
                });
            });
    };

    return (
        <>
            <div className={`toDoItem ${isSelected ? 'active' : ''}`} onClick={() => onItemClick(toDo)}>
                <div className="titleContainer">
                    <NeonCircle
                        color={statusColorMapping[toDo.statusId - 1].color}
                        shadow={statusColorMapping[toDo.statusId - 1].shadow}
                    />
                    <div className="taskTitle">{toDo?.title}</div>
                </div>
                <div onClick={handleDeleteOnClick}>
                    <Trash size={24} />
                </div>
            </div>
            <Modal
                open={open}
                confirmLoading={confirmLoading}
                title="Do you really want to delete the task?"
                onCancel={handleOnCancel}
                onOk={handleOnOk}
            />
        </>
    );
}

export default ToDoListItem;
