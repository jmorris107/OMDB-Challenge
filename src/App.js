import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNominate from './components/AddNominate';
import RemoveNominate from './components/RemoveNominate';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [nominate, setNominate] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=cb666699`
    const response = await fetch(url);
    const responseJson = await response.json();
// search movies
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
//if movie nominates
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
