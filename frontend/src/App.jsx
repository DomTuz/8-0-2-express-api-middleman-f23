import { useState, useEffect } from 'react';
import fetchData from './utils/fetchData';

// We do NOT want to expose this information like this
const API_KEY = 'YLSmQ7YZd6YndqlTkexFWAFHr7K0XZ9b';

function App() {
  const [gifs, setGifs] = useState([])

  useEffect(() => {
    const doFetch = async () => {
      const API_URL = `/api/gifs`;
      try {
        const [data, error] = await fetchData(API_URL);
        if (data) setGifs(data.data);
      } catch (error) {
        console.log(error.message)
      }
    }
    doFetch();
  }, [])

  return (
    <div>
      <h1>3 Trending Gifs</h1>
      <ul>
        {
          gifs.length > 0
            ? gifs.map((gif) => (
              <li key={gif.id}>
                <img src={gif.images.original.url}></img>
              </li>
            ))
            : <p>Gifs Not Found</p>
        }
      </ul>
    </div>
  );
}

export default App;
