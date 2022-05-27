import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

import { MovieCard } from './components/MovieCard/MovieCard';
import { Filter } from './components/Filter/Filter';

const API_KEY = '';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  const fetchPopular = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const movies = await data.json();
      setPopular(movies.results);
      setFiltered(movies.results);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className='App'>
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className={styles.popular}>
        <AnimatePresence>
          {filtered.map((el: any) => (
            <MovieCard key={el.id} url={el.poster_path} title={el.title} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
