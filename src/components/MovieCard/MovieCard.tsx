import React, { FC } from 'react';

import styles from 'MovieCard.module.scss';
import { motion } from 'framer-motion';

interface MovieCard {
  title: string;
  url: string;
}

export const MovieCard: FC<MovieCard> = ({ title, url }) => {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <h2>{title}</h2>
      <img src={'https://image.tmdb.org/t/p/w500' + url}></img>
    </motion.div>
  );
};
