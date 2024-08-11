import { Input, Select } from "antd";
import ReactQuill from "react-quill";
import "./ToDoItemEditor.css";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import StatusOption from "../StatusOption/StatusOption";
import { StatusContext } from "../../contexts/statusContext";

export interface InputValues {
    title: string;
    statusId: number;
    description: string;
}

interface ToDoItemEditorProps {
    inputValues: InputValues;
    onInputValuesChange: (updatedValues: InputValues) => void;
    setError?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ToDoItemEditor({
    inputValues,
    onInputValuesChange,
    setError,
}: ToDoItemEditorProps) {
    const quillRef = useRef<ReactQuill>(null);

    const [isTitleError, setIsTitleError] = useState(false);
    const [titleError, setTitleError] = useState<"" | "error">("");

    const [isQuillError, setIsQuillError] = useState(false);
    const [quillErrorMessage, setQuillErrorMessage] = useState("");

    const [inputsState, setInputsState] = useState({ ...inputValues });

    useEffect(() => {
        setInputsState({ ...inputValues });
    }, [inputValues]);

    useEffect(() => {
        onInputValuesChange(inputsState);
        checkErrors();
    }, [inputsState]);

    useEffect(() => {
        if (setError) {
            setError(isTitleError || isQuillError);
        }
    }, [isTitleError, isQuillError]);

    const statusContext = useContext(StatusContext);

    function checkErrors() {
        let textLength: number =
            quillRef.current?.getEditor().getText().trim().length ?? 0;

        if (textLength > 1000) {
            setIsQuillError(true);
            setQuillErrorMessage(
                "Description length must be not greater than 1000"
            );
        } else {
            setIsQuillError(false);
            setQuillErrorMessage("");
        }

        if (inputsState.title.length < 1 || inputsState.title.length > 100) {
            setTitleError("error");
            setIsTitleError(true);
        } else {
            setIsTitleError(false);
            setTitleError("");
        }
    }

    function handleQuillOnChange(content: string) {
        setInputsState((prevState) => ({
            ...prevState,
            description: content,
        }));

        let textLength: number =
            quillRef.current?.getEditor().getText().trim().length ?? 0;

        if (textLength > 1000) {
            setIsQuillError(true);
            setQuillErrorMessage(
                "Description length must be not greater than 1000"
            );
        } else {
            setIsQuillError(false);
            setQuillErrorMessage("");
        }
    }

    function handleTitleOnChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length < 1 || e.target.value.length > 100) {
            setTitleError("error");
            setIsTitleError(true);
        } else {
            setIsTitleError(false);
            setTitleError("");
        }

        setInputsState((prevState) => ({
            ...prevState,
            title: e.target.value,
        }));
    }

    function handleStatusIdOnChange(value: string) {
        setInputsState((prevState) => ({
            ...prevState,
            statusId: +value,
        }));
    }

    return (
        <div className="toDoEditor">
            <Input
                className="titleInput"
                placeholder="Title"
                status={titleError}
                onChange={handleTitleOnChange}
                defaultValue="New Task"
                value={inputsState.title}
                count={{
                    show: true,
                    max: 100,
                }}
            />
            <Select
                className="statusSelect"
                defaultValue={statusContext.statuses[0]?.id.toString()}
                placeholder="Status"
                value={inputsState.statusId.toString()}
                onChange={handleStatusIdOnChange}
            >
                {statusContext.statuses.map((status, index) => (
                    <Select.Option
                        key={index.toString()}
                        value={status.id.toString()}
                    >
                        <StatusOption status={status} />
                    </Select.Option>
                ))}
            </Select>
            <div className="editorContainer">
                <ReactQuill
                    ref={quillRef}
                    onChange={handleQuillOnChange}
                    className="editor"
                    placeholder="Description"
                    value={inputsState.description}
                />
            </div>

            {isQuillError && (
                <div className="errorMessage">{quillErrorMessage}</div>
            )}
        </div>
    );
}

export default ToDoItemEditor;
