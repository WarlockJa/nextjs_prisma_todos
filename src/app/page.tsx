import { prisma } from "@/db";
import Link from "next/link";
import TodoItem from "./components/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

// server function that saves changes to the DB
async function toggleTodo(id: string, complete: boolean) {
  // next js directive to use server side
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

// server function that deletes todo in the DB
async function deleteTodo(id: string) {
  // next js directive to use server side
  "use server";

  await prisma.todo.delete({ where: { id } });
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded transition-colors duration-300 hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4 border-2 p-4 rounded-md">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}
