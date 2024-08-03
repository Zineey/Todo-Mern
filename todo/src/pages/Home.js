import { useEffect } from "react";
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";
import { useTodoContext } from "../hooks/useTodoContext";


const Home = () => {
    const {todos, dispatch} = useTodoContext();

    useEffect(() =>{

        const fetchData = async () => {
            const response = await fetch('/api/todos');
            const data = await response.json();

            if(response.ok){
                dispatch({type: 'GET_TODOS', payload: data})
            } 
        }
        fetchData();
    }, [dispatch])

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