import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNominate from './components/AddNominate';
import RemoveNominate from './components/RemoveNominate';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [nominate, setNominate] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=cb666699`
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieNominate = JSON.parse(
            localStorage.getItem('react-movie-app-nominate')
    );

    if(movieNominate) {
          setNominate(movieNominate);
    }
  }, []);

    

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-nominate', JSON.stringify(items));
  };

  const addNominateMovie = (movie) => {
      const newNominateList = [...nominate, movie]
      setNominate(newNominateList);
      saveToLocalStorage(newNominateList);

  };

  useEffect(() => {
    if (setNominate.length === 5) {
      store.addNotification({
        message: "You've nominated five films",
        type: "default",
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      })
    }
  }, [setNominate])



  const removeNominateMovie = (movie) => {
    const newNominateList = nominate.filter(
      (nominate) => nominate.imdbID !== movie.imdbID
    );

    setNominate(newNominateList);
    saveToLocalStorage(newNominateList);
  };

  return (
    <div className='container-fluid movie-app' >
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="OMDB NOMINATE" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
        movies={movies} 
        handleNominateClick={addNominateMovie} 
        nominateComponent={AddNominate}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="NOMINATED MOVIES" />
      </div>
      <div className='row'>
        <MovieList 
        movies={nominate} 
        handleNominateClick={removeNominateMovie} 
        nominateComponent={RemoveNominate}
        />
      </div>
    </div>
    );
};





export default App;
