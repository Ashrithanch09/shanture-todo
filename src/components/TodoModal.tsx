"use client"
import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoTable, { TodoList } from "./TodoTable";
import { Button } from "./ui/button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const TodoModal = () => {
    const [todoList, setTodoList] = useState<TodoList[]>([]);

    const handleExportPdf = () => {
        const doc = new jsPDF();

        // Create a temporary HTML element
        const tempElement = document.createElement('div');

        // Create a separate table for the PDF
        const pdfTable = `
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${todoList.map((todo) => `
                        <tr>
                            <td>${todo.description}</td>
                            <td>${todo.completed ? "Completed" : "Pending"}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        // Append the table HTML to the temporary element
        tempElement.innerHTML = pdfTable;

        // Get the table element and check if it exists
        const tableElement = tempElement.querySelector('table');
        if (tableElement) {
            autoTable(doc, {
                html: tableElement
            });
        }

        doc.save("todo.pdf");
    };


    const addTask = (newTask: TodoList) => {
        setTodoList((prevList) => [...prevList, newTask]);
    };

    return (
        <main className="h-full w-full rounded-md">
            <div className="flex flex-col h-full w-full rounded-md p-2 gap-y-2">
                <h1 className="text-white text-center font-semibold text-3xl">To-Do</h1>
                <div className="flex flex-col h-full w-full rounded-md bg-zinc-800 p-2 items-center gap-y-2">
                    <div className="flex w-full items-end justify-evenly">
                        <AddTodo addTask={addTask} />
                        <Button className="bg-zinc-900 hover:bg-black px-6 mb-2" onClick={handleExportPdf}>Download PDF</Button>
                    </div>
                    <TodoTable todoList={todoList} setTodoList={setTodoList} />
                </div>
            </div>
        </main>
    );
};

export default TodoModal;