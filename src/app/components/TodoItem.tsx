"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

type TodoItemProps = {
    id: string;
    title: string;
    complete: boolean;
    toggleTodo: (id: string, complete: boolean) => void;
    // deleteTodo: (id: string) => void;
};

// refreshing the client page after SSR delete todo
// const handleDeleteTodo = async (
//     id: string,
//     deleteTodo: (id: string) => void,
//     router: AppRouterInstance
// ) => {
//     await deleteTodo(id);
//     router.refresh();
// };

export default function TodoItem({
    id,
    title,
    complete,
    toggleTodo,
}: // deleteTodo,
TodoItemProps) {
    const router = useRouter();
    return (
        <li className="flex gap-1 items-center">
            <input
                id={id}
                type="checkbox"
                defaultChecked={complete}
                className="peer cursor-pointer"
                onChange={(e) => toggleTodo(id, e.target.checked)}
            />
            <label
                htmlFor={id}
                className="peer-checked:line-through cursor-pointer peer-checked:text-slate-500 flex-1"
            >
                {title}
            </label>
            {/* <button
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        onClick={() => handleDeleteTodo(id, deleteTodo, router)}
      >
        Delete
      </button> */}
        </li>
    );
}
