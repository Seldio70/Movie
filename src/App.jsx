import React from 'react'
import Search from './components/Search'
import { useState , useEffect} from 'react'
import Spinner from './components/Spinner'

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = "91e1e06bc7815a2624b6a6970b50713f"

// const API_OPTIONS = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${API_KEY}`
//   }
// }

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [movieList, setMovieList] = useState([])
  const [errorMessage, setErrorMessage] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const  fetchMovies = async () => {

    setIsLoading(true)
    setErrorMessage('')


    try {
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
     
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'No movies found.')
        setMovieList([])
        return
      }

      setMovieList(data.results || []) 
    }catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage('Failed to fetch movies. Please try again later.')
   }finally{
    setIsLoading(false)
   }
  }
  
  useEffect(() => {
    fetchMovies()
  }, [])
  

  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>

          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span> Youll Enjoy Without The Hassle</h1>
          
           <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

         {/* <h1 className='text-white text-4xl'>{searchTerm }</h1> */}

          </header>


        </div>
         <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

        {isLoading ? (
          <p className='text-white'><Spinner/></p>
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <p key={movie.id} className='text-white'>{movie.title}</p>
            ))}
          </ul>
        )}
          

          {/* {errorMessage && <p className='text-red-500'>{errorMessage}</p>} */}
         </section>
        
      </div>
      </main>
  )
}

export default App