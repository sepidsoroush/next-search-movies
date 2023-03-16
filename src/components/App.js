import React from "react";
import { useState , useEffect} from "react";
import axios from "axios"
import SearchBox from "./SearchBox";
import MoviesList from "./MovieList";
import Alert from './Error'
import { AppContext } from "@/components/context";
import styles from '../styles/App.module.css'

const App = ()=>{
    const [searchedMovies , setSearchedMovies] = useState([]);
    const [input , setInput] = useState({
        title : 'Batman',
        type : ''});
    const [error , setError] = useState('')

    const getData = ()=>{
        axios
            .get(`http://www.omdbapi.com/?apikey=6749959a&s=${input.title}&type=${input.type}`)
            .then((response) => {
                setSearchedMovies(response.data.Search);
                setError(response.data.Error)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)});
    }; 
    useEffect(()=>{
        getData();
    } , []);
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            getData();
        }
    };
    console.log(error)
    return(
        <div className={styles.container}>
            <AppContext.Provider 
            value={{searchedMovies , input , setInput , getData , handleKeypress , error}} >
                <SearchBox />
                <Alert />
                <MoviesList />
            </AppContext.Provider>
        </div>
    );
}

export default App;