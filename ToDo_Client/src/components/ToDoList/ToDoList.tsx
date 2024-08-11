import Search from "antd/es/input/Search";
import ToDoListItem from "../ToDoListItem/ToDoListItem";
import "./ToDoList.css";
import { Button, Empty, Select, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import {
    ToDoItemActionKind,
    ToDoItemsContex,
} from "../../contexts/toDoItemContext";
import NewToDoModal from "../NewToDoModal/NewToDoModal";
import ToDoItem from "../../models/toDoItem";
import { StatusContext } from "../../contexts/statusContext";
import StatusOption from "../StatusOption/StatusOption";

interface ToDoListProps {
    onToDoListItemClick?: (toDo: ToDoItem) => void;
}

function ToDoList({ onToDoListItemClick }: ToDoListProps) {
    const [open, setOpen] = useState(false);
    const { state, dispatch } = useContext(ToDoItemsContex);

    const statusContext = useContext(StatusContext);

    const [filteredList, setFilteredList] = useState(state.toDoItems);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [titleFilter, setTitleFilter] = useState("");

    useEffect(() => {
        setFilteredList(
            state.toDoItems.filter((item) => {
                return (
                    item.title
                        .toLowerCase()
                        .search(titleFilter.toLowerCase()) !== -1 &&
                    (statusFilter.length === 0 ||
                        statusFilter.filter((id) => {
                            return +id === item.statusId;
                        }).length > 0)
                );
            })
        );
    }, [statusFilter, titleFilter, state.toDoItems]);

    const showModal = () => {
        setOpen(true);
    };

    const handleOnItemClick = (toDoItem: ToDoItem) => {
        dispatch({
            type: ToDoItemActionKind.SELECT_TODO_ITEM,
            payload: toDoItem,
        });
    };

    return (
        <div className="toDoList">
            <div className="searchPanel">
                <Search
                    placeholder="Serch tasks by title"
                    allowClear
                    onChange={(elem) => setTitleFilter(elem.target.value)}
                />
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Filter by status"
                    onChange={(statuses) => setStatusFilter(statuses)}
                >
                    {statusContext.statuses.map((status, index) => (
                        <Select.Option
                            key={status.id}
                            value={status.id.toString()}
                        >
                            <StatusOption status={status} />
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="toDoListItems">
                {filteredList.length > 0 ? (
                    filteredList.map((toDoItem) => (
                        <ToDoListItem
                            onItemClick={() => handleOnItemClick(toDoItem)}
                            key={toDoItem.id}
                            toDo={toDoItem}
                        />
                    ))
                ) : (
                    <div className="emptyList">
                        <Empty
                            className="empty"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            imageStyle={{ height: 60 }}
                            description={
                                <Typography.Text>
                                    You have no tasks yet
                                </Typography.Text>
                            }
                        >
                            <NewToDoModal isOpen={open} setIsOpen={setOpen} />
                            <Button type="primary" onClick={showModal}>
                                Add Task
                            </Button>
                        </Empty>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ToDoList;
