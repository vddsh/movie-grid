import React, { useEffect, useRef, FC } from 'react';

import styles from './Filter.module.scss';
import { useAnimation } from '../../hooks/use-animation';

export const Filter: FC<any> = ({
  popular,
  setFiltered,
  activeGenre,
  setActiveGenre,
}) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  useAnimation(ref1, { animationType: 'inner', color: '#48a6f2' });
  useAnimation(ref2, { animationType: 'inner', color: '#48a6f2' });
  useAnimation(ref3, { animationType: 'inner', color: '#48a6f2' });

  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(popular);
      return;
    }
    const filtered = popular.filter((el: any) =>
      el.genre_ids.includes(activeGenre)
    );
    setFiltered(filtered);
  }, [activeGenre]);

  return (
    <div>
      <button
        ref={ref1}
        className={styles.btn}
        onClick={() => setActiveGenre(0)}
      >
        All
      </button>
      <button
        ref={ref2}
        className={styles.btn}
        onClick={() => setActiveGenre(35)}
      >
        Comedy
      </button>
      <button
        ref={ref3}
        className={styles.btn}
        onClick={() => setActiveGenre(28)}
      >
        Action
      </button>
    </div>
  );
};
