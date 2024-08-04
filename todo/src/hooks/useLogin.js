import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {dispatch} = useAuthContext();

    const login = async(email, password, firstName, lastName) =>{
        setLoading(true);
        setError(null);

        const response = await fetch('auth/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if(!response.ok){
            setLoading(false);
            setError(data.error);
        }
        if(response.ok){
            // LOCAL STORAGE FOR SESSION
            localStorage.setItem('user', JSON.stringify(data));
            // update AuthContext
            dispatch({type: 'LOGIN', payload: data});


            setLoading(false);
        }
    }

    return {error, loading, login};
}