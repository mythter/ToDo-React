import { useState } from "react";
import "./Header.css";
import { Button } from "antd";
import NewToDoModal from "../NewToDoModal/NewToDoModal";

function Header() {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    return (
        <header>
            <Button type="primary" onClick={showModal}>
                Add Task
            </Button>
            <NewToDoModal
                isOpen={open}
                setIsOpen={setOpen}
            />
        </header>
    );
}

export default Header;
