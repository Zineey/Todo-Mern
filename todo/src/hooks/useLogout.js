import { useAuthContext } from './useAuthContext';
import { useTodoContext } from './useTodoContext';

export const useLogout = () =>{
    const {dispatch} = useAuthContext();
    const {dispatch: todoDispatch} = useTodoContext();

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        todoDispatch({type: 'GET_TODOS', payload: null});

    }
    return {logout};
} 