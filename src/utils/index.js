import axios from "axios";
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: tmdbApiKey
    }
});

export const fetchToken = async () => {
    try{
        const { data } = await moviesApi.get('authentication/token/new');
        const token = data.request_token;
        
        if(data.success){
            localStorage.setItem('request_token', token);
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    }catch(err){
        console.log(err + 'sorry try again later');
    }
}

export const createSessionId = async () => {
    try{
        const {data: { session_id}} = await moviesApi.post('authentication/session/new', {
            request_token : localStorage.getItem('request_token')
        });
        localStorage.setItem('session_id', session_id);
        return session_id;
    }catch(err){
        console.log(err + 'sorry try again later');
    }
}