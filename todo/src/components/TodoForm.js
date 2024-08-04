import { useState, useEffect } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuthContext } from "../hooks/useAuthContext";
const MySwal = withReactContent(Swal);

const TodoForm = ({ todo = null, setIsEditing = null }) => {
    const { dispatch } = useTodoContext();
    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setTime(todo.time);
            setCompleted(todo.completed);
        }
    }, [todo]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            return MySwal.fire({
                title: 'Error!',
                text: 'You must be logged in to add a new task!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: todo ? 'Do you want to update this task?' : 'Do you want to add this new task?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            const newTodo = { title, time, completed };

            let url = '/api/todos/create';
            let method = 'POST';

            if (todo) {
                url = `/api/todos/${todo._id}`;
                method = 'PATCH';
            }

            const response = await fetch(url, {
                method,
                body: JSON.stringify(newTodo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
                setEmptyFields(data.emptyFields);
            }
            if (response.ok) {
                setEmptyFields([]);
                setTitle('');
                setTime('');
                setCompleted(false);
                setError(null);

                if (todo) {
                    dispatch({ type: 'UPDATE_TODO', payload: data });
                    setIsEditing(false);
                } else {
                    dispatch({ type: 'CREATE_TODO', payload: data });
                }

                await MySwal.fire({
                    title: 'Success!',
                    text: todo ? 'Task updated successfully!' : 'New task added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <h3>{todo ? 'Edit Task' : 'Add a new Task'}</h3>
            {error && <div className="error">{error}</div>}
            <label>Task Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Task Time:</label>
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={emptyFields.includes('time') ? 'error' : ''}
            />

            {todo && (
                <label>Task Status:</label>
            )}
            {todo && (
                <select
                    value={completed}
                    onChange={(e) => setCompleted(e.target.value === 'true')}
                    className={emptyFields.includes('completed') ? 'error' : ''}
                >
                    <option value={false}>Pending</option>
                    <option value={true}>Completed</option>
                </select>
            )}
            <button className="button-submit">{todo ? 'Update Task' : 'Add Task'}</button>
            {todo && <button type="button" className="button-cancel" onClick={() => setIsEditing(false)}>Cancel</button>}
        </form>
    );
}

export default TodoForm;
