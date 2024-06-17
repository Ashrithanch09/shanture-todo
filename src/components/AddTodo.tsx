"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { toast } from "react-toastify";
import { TodoList } from "./TodoTable";

interface AddTodoProps {
    addTask: (newTask: TodoList) => void;
}

const AddTodo = ({ addTask }: AddTodoProps) => {
    const [description, setDescription] = useState("");
    const handleAddClick = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tasks', {
                description: description
            });

            if (response.status === 200) {
                toast.success("Task added successfully.")
                addTask(response.data);
                setDescription('');
            } else {
                toast.error("Failed to add task.")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    
    return (
        <div className="grid w-full max-w-2xl items-center gap-2 p-2">
            <Label className="text-gray-200 text-lg" htmlFor="email">Add To-Do</Label>
            <div className="flex gap-x-4">
                <Input type="text" placeholder="Description" className="bg-gray-300" value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <Button className="bg-zinc-900 hover:bg-black px-6" type="button" onClick={handleAddClick}>Add</Button>
            </div>
        </div>
    );
};

export default AddTodo;
