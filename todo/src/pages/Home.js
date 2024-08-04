import { useEffect } from "react";
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";
import { useTodoContext } from "../hooks/useTodoContext";
import {useAuthContext} from '../hooks/useAuthContext';

const Home = () => {
    const {todos, dispatch} = useTodoContext();
    const {user} = useAuthContext();

    useEffect(() =>{

        const fetchData = async () => {
            const response = await fetch('/api/todos',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();

            if(response.ok){
                dispatch({type: 'GET_TODOS', payload: data})
            } 
        }

        if(user){
            console.log('Fetching data...');
            fetchData();
        }

    }, [dispatch, user])

    return(
        <div className="home">
            <div className="data">
                {todos && todos.map((todo) => (
                    <TodoDetails key={todo._id} todo={todo} />  
                ))}
            </div>
            <TodoForm/>   
        </div>
    )
}

export default Home;