import React from 'react';

const MovieList = (props) => {
    const NominateComponent = props.nominateComponent;

    
    
    return (
        <>
        {props.movies.map((movie, index) => (
            <div class="container">
        <div className='image-container d-flex justify-content-start m-3'>
            
            <img src={movie.Poster} alt='movie'></img>
          
            
            <div class="centered">
               <p >{movie.Title}</p>
                <p >{movie.Year}</p> </div>

           
            <div onClick={() => props.handleNominateClick(movie)}
            className='overlay d-flex align-items-center justify-content-center'>
            <NominateComponent /></div>
            </div>
        </div>
        ))}
        </>
    );
};

export default MovieList;