import { useEffect, useState } from 'react';
import './App.css';


const KEY="409de96a"
export default function App(){


 // function dtdatalisofmoves(){
  
     
  //}

  const[movies,setMovies]=useState([])
const[query,setQuery]=useState('boy')
const[isloading,setIsloading]=useState(false)
const[error,setError]=useState("")


useEffect(function(){
   async function getmovis(){
try{
    setIsloading(true)
 setError('')
  const res=await fetch(`http://www.omdbapi.com/?apikey=${KEY} &s=${query}`);
  

  if(!res.ok) throw new Error("Somethiong weat wrong with fetch movies")

  const data =await res.json();
//  console.log(data);
  if(data.Response === "False")throw new Error("Movie Not Found");
//  console.log(data)
setMovies(data.Search)

setIsloading(false)
}catch(err){
  console.error(err.message)
setError(err.message)
}finally{
  setIsloading(false)
  
}

}
if(!query.length >1){
  setMovies([]);
  setError("");
return;
}

getmovis()
},[query])


  return (
    <div className="App">
      
      <Header query={query} setQuery={setQuery} movies={movies} />
 
  <div id='basic-div'>

  {isloading && <Loding /> }
 {!isloading && !error && <Movielise movies={movies} />   } 
 {error && <ErrorMessage message={error} />}
 </div>
      </div>
  );
}

///////////////////


function Header({query,setQuery,movies}){
  return <div>

<header className='div-Search'>
  <em className='em-movies-nameStore'><i>U</i>se<i>P</i>opcorn <i>Welcome</i></em>
<input className='input-searh' value={query} type="search" onChange={e=>setQuery(e.target.value)} placeholder='Search...'/>
  <em className='em-movies-length'>Numper Of Movie We Found <i>{movies.length}</i></em>
  </header>



  </div>
}




function Movielise({movies}){
  const[isSelect,setIsSelect]=useState(true)
  const[imdbID,setImdbID]=useState("tt0914798")
  
  
     
  return<div> <ul>{isSelect?
    
movies.map(movie=><Movie  setImdbID={setImdbID} setIsSelect={setIsSelect}  isSelect={isSelect}  movie={movie}  key={movie.ImdbID}/>)
:<MovieDetails  imdbID={imdbID} setIsSelect={setIsSelect} />     

  }</ul>

</div>












}

////////////////////////////////////////


/////////////////////////////////////////////
function Movie({movie,setImdbID,isSelect,setIsSelect}){
  //const[headen,setHeaden]=useState(true);
 
  
  function handlwithdatalis(id){
    setImdbID(id)
    
    setIsSelect(false)
    }
  



return  <div className='basic-div'>
<div className="div-imag-information" >
  <img className='' src={movie.Poster?movie.Poster:<Lodingformoveditals />} alt={movie.ImdbID} width="200px" />
 <div className='information'>
  <em>
<button className='button' onClick={()=>handlwithdatalis(movie.imdbID)}>information</button>
 
  </em>
 </div>
 
 
 </div>
    </div>
  
    
  
}

function MovieDetails({setIsSelect,imdbID}){



  const[detailsMovieDetails,setDetailsMovieDetails]=useState([])
  //const [query,setQuery]=useState(imdbID);
  console.log(detailsMovieDetails);
       



function handlwithdatalis(){
//  setDetailsMovieDetails(imdbID)
  setIsSelect(true)
    }


    useEffect(function (){

      async function getMovieDetails(){
       
      const res =await fetch(`http://www.omdbapi.com/?apikey=${KEY} &i=${imdbID}`)
      if(!res.ok) throw new Error("some think roang pleace chick you wifi")
    
      const data = await res.json();
       setDetailsMovieDetails(data);
        //console.log(detailsMovieDetails);
        
       
      }
      
      // 
  
       
    
  
    getMovieDetails();
     
  
  },[imdbID]);
  


  







    
  return <div>{<div className='div-information-move' >
  <div className='all-infomation'>
<div>
  <em className='Title'><h2  className='h2'>Title:</h2> {detailsMovieDetails.Title?detailsMovieDetails.Title:<Lodingformoveditals/>}</em>
  <em className='Title'><h2 className='h2'>Actors:</h2> {detailsMovieDetails.Actors?detailsMovieDetails.Actors:<Lodingformoveditals/>}</em>
  <em className='Title'><h2 className='h2'>Country :</h2> {detailsMovieDetails.Country?detailsMovieDetails.Country:<Lodingformoveditals/>}</em>
  <em className='Title'><h2 className='h2'>Genre:</h2> {detailsMovieDetails.Genre?detailsMovieDetails.Genre:<Lodingformoveditals/>}</em>
  <em className='Title'><h2 className='h2'>Language:</h2> {detailsMovieDetails.Language?detailsMovieDetails.Language:<Lodingformoveditals/>}</em>
  </div>
  <div>
  <em className='Title'><h2  className='h2'>Plot :</h2> {detailsMovieDetails.Plot?detailsMovieDetails.Plot:<Lodingformoveditals/>}</em>
  <em className='Title'><h2 className='h2'>Awards :</h2> {detailsMovieDetails.Awards?detailsMovieDetails.Awards:<Lodingformoveditals/>}</em>
  <em className='Title'><h2 className='h2'>Director :</h2> {detailsMovieDetails.Director?detailsMovieDetails.Director:<Lodingformoveditals/>}</em>
  <em className='Title'><h2 className='h2'>Rated:</h2> {detailsMovieDetails.Rated?detailsMovieDetails.Rated:<Lodingformoveditals/>}</em>
   </div>
  
  
  </div>
  <div className='information'>
  <em>
<button  className='return-button' onClick={()=>handlwithdatalis()}>back</button>
 
  </em>
 </div>
 
 
 </div>}
 </div>
 
}
/////////////////////////////////
// function MovieDetails({imdbID}){
//   const[moviesDitalis,setMoviesDitalis]=useState({})
//   useEffect(function (){

//     async function getMovieDetails(){
//     const res =await fetch(`http://www.omdbapi.com/?apikey=${KEY} &i=${imdbID}`)
    
//     const data = await res.json();

//     // setMoviesDitalis(data.Search);

//     // console.log(moviesDitalis);

//   };

//   getMovieDetails();
    

// },[imdbID]);

//   return<div className='MovieDetails'>
//   <h2>1</h2>
//   </div>
// }




//////////////////

function ErrorMessage({message})
{

 
 
 
  return <p className='Error-message'>
    {message}
  </p>

}
///////////////

function Lodingformoveditals(){
  return < button  className='buttom-animation'>
      
  </button>
  }

function Loding(){
  return <div>
  <h2 className='loding'>Loding ...</h2>
  </div>
  }
 
// function InformationOfMovie(){
//   return <div>
// useEffect  (function(
//   function featchmavie(){
// fetch(`http://www.omdbapi.com/?apikey=${KEY} &s=${query}`)


// }),[])
// featchmavie()


//   </div>
// }





// function SearchLoding(){
//   return <div>
//   <h2 className='loding'>Search ...</h2>
//   </div>
//   }

