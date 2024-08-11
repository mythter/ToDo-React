import React, { useState } from "react";

interface Item {
    id: number;
    name: string;
    description: string;
    category: string;
}

interface ItemProps {
    item: Item;
    onClick: (item: Item) => void;
}

interface EditorProps {
    item: Item;
    onChange: (name: string, value: string) => void;
}

interface ControlButtonsProps {
    onSave: () => void;
    onCancel: () => void;
}

// Пример компонента списка
const ItemComponent: React.FC<ItemProps> = ({ item, onClick }) => (
    <div onClick={() => onClick(item)}>{item.name}</div>
);

// Компонент редактора
const Editor: React.FC<EditorProps> = ({ item, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div>
            <h2>Редактор компонента</h2>
            <input
                name="name"
                defaultValue={item.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="description"
                defaultValue={item.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                name="category"
                defaultValue={item.category}
                onChange={handleChange}
                placeholder="Category"
            />
        </div>
    );
};

// Компонент кнопок управления
const ControlButtons: React.FC<ControlButtonsProps> = ({
    onSave,
    onCancel,
}) => (
    <div>
        <button onClick={onSave}>Применить изменения</button>
        <button onClick={onCancel}>Отменить изменения</button>
    </div>
);

// Главный компонент
const App: React.FC = () => {
    const [items, setItems] = useState<Item[]>([
        {
            id: 1,
            name: "Item 1",
            description: "Description 1",
            category: "Category 1",
        },
        {
            id: 2,
            name: "Item 2",
            description: "Description 2",
            category: "Category 2",
        },
        {
            id: 3,
            name: "Item 3",
            description: "Description 3",
            category: "Category 3",
        },
    ]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [currentChanges, setCurrentChanges] = useState<Partial<Item>>({});

    const handleItemClick = (item: Item) => {
        setSelectedItem(item);
        setCurrentChanges({ ...item });
    };

    const handleFieldChange = (name: string, value: string) => {
        setCurrentChanges((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (selectedItem) {
            setItems(
                items.map((item) =>
                    item.id === selectedItem.id
                        ? { ...selectedItem, ...currentChanges }
                        : item
                )
            );
            setSelectedItem(null);
            setCurrentChanges({});
        }
    };

    const handleCancel = () => {
        setSelectedItem(null);
        setCurrentChanges({});
    };

    return (
        <div>
            <h1>Список компонентов</h1>
            {items.map((item) => (
                <ItemComponent
                    key={item.id}
                    item={item}
                    onClick={handleItemClick}
                />
            ))}
            {selectedItem && (
                <div>
                    <Editor item={selectedItem} onChange={handleFieldChange} />
                    <ControlButtons
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </div>
            )}
        </div>
    );
};

export {};
