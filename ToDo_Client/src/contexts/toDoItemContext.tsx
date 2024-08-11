import {
    createContext,
    useEffect,
    ReactNode,
    useReducer,
    Dispatch,
} from "react";

import ToDoItem from "../models/toDoItem";

interface ToDoItemContexValue {
    toDoItems: ToDoItem[];
    currentToDoItem: ToDoItem | null;
}

export enum ToDoItemActionKind {
    LOADED_TODO_ITEMS = "LOADED_TODO_ITEMS",
    TODO_ITEM_ADDED = "TODO_ITEM_ADDED",
    SELECT_TODO_ITEM = "SELECT_TODO_ITEM",
    CURRENT_TODO_CHANGED = "CURRENT_TODO_CHANGED",
    TODO_DELETED = "TODO_DELETED",
    TODO_UPDATED = "TODO_UPDATED",
}

interface LoadedToDoItemsAction {
    type: ToDoItemActionKind.LOADED_TODO_ITEMS;
    payload: ToDoItem[];
}

interface ToDoItemAddedAction {
    type: ToDoItemActionKind.TODO_ITEM_ADDED;
    payload: ToDoItem;
}

interface SelectToDoItemAction {
    type: ToDoItemActionKind.SELECT_TODO_ITEM;
    payload: ToDoItem;
}

interface CurrentToDoChangedAction {
    type: ToDoItemActionKind.CURRENT_TODO_CHANGED;
    payload: ToDoItem;
}

interface ToDoDeletedAction {
    type: ToDoItemActionKind.TODO_DELETED;
    payload: ToDoItem;
}

interface ToDoUpdatedAction {
    type: ToDoItemActionKind.TODO_UPDATED;
    payload: ToDoItem;
}

type ToDoItemAction =
    | LoadedToDoItemsAction
    | ToDoItemAddedAction
    | SelectToDoItemAction
    | CurrentToDoChangedAction
    | ToDoDeletedAction
    | ToDoUpdatedAction;

const initialValue: ToDoItemContexValue = {
    toDoItems: [],
    currentToDoItem: null,
};

const reducer = (state: ToDoItemContexValue, action: ToDoItemAction) => {
    switch (action.type) {
        case ToDoItemActionKind.LOADED_TODO_ITEMS: {
            return {
                ...state,
                toDoItems: action.payload,
            };
        }
        case ToDoItemActionKind.TODO_ITEM_ADDED: {
            return {
                ...state,
                toDoItems: [...state.toDoItems, action.payload],
            };
        }
        case ToDoItemActionKind.SELECT_TODO_ITEM: {
            return {
                ...state,
                currentToDoItem: action.payload,
            };
        }
        case ToDoItemActionKind.CURRENT_TODO_CHANGED: {
            return {
                ...state,
                currentToDoItem: action.payload,
            };
        }
        case ToDoItemActionKind.TODO_DELETED: {
            return {
                ...state,
                toDoItems: [
                    ...state.toDoItems.filter((item) => {
                        return item.id !== action.payload.id;
                    }),
                ],
                currentToDoItem:
                    state.currentToDoItem?.id === action.payload.id
                        ? null
                        : state.currentToDoItem,
            };
        }
        case ToDoItemActionKind.TODO_UPDATED: {
            const index = state.toDoItems.findIndex(
                (item) => item.id === action.payload.id
            );
            state.toDoItems[index] = action.payload;
            return {
                ...state,
                toDoItems: [...state.toDoItems],
            };
        }
        default: {
            return state;
        }
    }
};

interface ToDoItemContextType {
    state: ToDoItemContexValue;
    dispatch: Dispatch<ToDoItemAction>;
}

export const ToDoItemsContex = createContext<ToDoItemContextType>({
    state: initialValue,
    dispatch: () => undefined,
});

interface DataProviderProps {
    children: ReactNode;
}

export function ToDoItemProvider({ children }: DataProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialValue);

    useEffect(() => {
        fetch("https://localhost:7148/api/ToDoItems")
            .then((response) => response.json())
            .then((data) =>
                dispatch({
                    type: ToDoItemActionKind.LOADED_TODO_ITEMS,
                    payload: data,
                })
            );
    }, []);

    return (
        <ToDoItemsContex.Provider value={{ state, dispatch }}>
            {children}
        </ToDoItemsContex.Provider>
    );
}
