"use client"
import { FunctionComponent, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Switch } from "./ui/switch";
import { toast } from "react-toastify";

interface ITodoTableProps {
    todoList: TodoList[];
    setTodoList: (data: TodoList[]) => void;
}

export interface TodoList {
    id: number;
    description: string;
    completed: boolean;
}

const TodoTable: FunctionComponent<ITodoTableProps> = ({ todoList, setTodoList }) => {
    const [localTodoList, setLocalTodoList] = useState<TodoList[]>([]);

    const fetchTodoList = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/tasks');
            setLocalTodoList(data);
            setTodoList(data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckboxChange = async (id: number, completed: boolean) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`);

            setLocalTodoList((prevList) =>
                prevList.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            setLocalTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
            toast.success("Task deleted successfully.");
        } catch (error) {
            toast.error("Failed to delete task.");
        }
    };

    useEffect(() => {
        fetchTodoList();
        setLocalTodoList(todoList);
    }, [todoList]);

    return (
        <div className="w-full px-12">
            {localTodoList && (
                <Table id="todo-table">
                    <TableHeader className="text-lg">
                        <TableRow>
                            <TableHead className="text-gray-300 w-[30vw] text-center">Description</TableHead>
                            {/* <TableHead className="text-gray-300">Status</TableHead> */}
                            <TableHead className="text-gray-300 w-[15vw] text-center print:hidden">Mark as Completed</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-white text-lg">
                        {localTodoList.map((todo) => (
                            <TableRow key={todo.id} className={`${todo.completed ? 'line-through' : ''}`}>
                                <TableCell className="w-[30vw]">{todo.description}</TableCell>
                                {/* <TableCell className="w-[100px]">{todo.completed ? 'Inactive' : 'Active'}</TableCell> */}
                                <TableCell className="w-[15vw] flex justify-center py-3">
                                    <Switch
                                        id="status"
                                        checked={todo.completed}
                                        onCheckedChange={() => handleCheckboxChange(todo.id, todo.completed)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className="bg-gray-300 hover:bg-gray-400 h-min py-2"
                                        onClick={() => handleDelete(todo.id)}
                                    >
                                        <Trash2 size={16} className="text-zinc-900" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default TodoTable;
