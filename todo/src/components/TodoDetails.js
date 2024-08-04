import { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import TodoForm from './TodoForm'; 
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuthContext } from '../hooks/useAuthContext';
const MySwal = withReactContent(Swal);

const TodoDetails = ({ todo }) => {
    const { dispatch } = useTodoContext();
    const [isEditing, setIsEditing] = useState(false); 
    const {user} = useAuthContext();


    function formatTime(time24) {
        let [hour, minute] = time24.split(':');
        hour = parseInt(hour);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    }

    const handleClick = async () => {
        if(!user){  
            return MySwal.fire({
                title: 'Error!',
                text: 'You must be logged in to delete a task!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        });

        if (result.isConfirmed) {
            const response = await fetch('/api/todos/' + todo._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                console.log('Deleted todo:', todo._id);
                dispatch({
                    type: 'DELETE_TODO',
                    payload: todo._id, 
                });

                await MySwal.fire({
                    title: 'Deleted!',
                    text: 'Your task has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error('Failed to delete todo:', response);

                await MySwal.fire({
                    title: 'Error!',
                    text: 'Failed to delete the task. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    const handleEditClick = () => {
        if(!user){
            return MySwal.fire({
                title: 'Error!',
                text: 'You must be logged in to edit a task!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        
        setIsEditing(true); 
    };

    return (
        <div className="todo-details">
            {isEditing ? (
                <TodoForm todo={todo} setIsEditing={setIsEditing} /> 
            ) : (
                <>
                    <h2>{todo.title}</h2>
                    <p>
                        {formatTime(todo.time)} -   
                        <span className={`taskType ${todo.completed ? 'completed' : 'notCompleted'}`}>
                            {todo.completed ? "Completed" : "Pending"}
                        </span>
                    </p>
                    <p className='time'>
                        {formatDistanceToNow(new Date(todo.createdAt), {addSuffix: true})}
                    </p>
                    <span className="edit-button" onClick={handleEditClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                        </svg>
                    </span>
                    <span className="delete-button" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                    </span>
                </>
            )}
        </div>
    );
};

export default TodoDetails;
