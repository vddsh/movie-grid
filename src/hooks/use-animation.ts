import React, { MutableRefObject, useEffect } from 'react';

type AnimationOptions = {
  color: string;
  duration: number;
  animationType: 'inner' | 'outer';
  scale: number;
};

const defaultOptions = {
  color: 'rgba(255,255,255, .5)',
  duration: 400,
  animationType: 'outer',
  scale: 2,
};

export const useAnimation = (
  ref: MutableRefObject<HTMLElement | null>,
  options: Partial<AnimationOptions> = {}
) => {
  useEffect(() => {
    if (!ref?.current || !ref.current.animate) {
      return;
    }
    const parentRef = ref.current;
    const styles = window.getComputedStyle(parentRef);
    const position = styles.getPropertyValue('position');

    if (!position || position == 'static') {
      parentRef.style.position = 'relative';
    }

    const HandleAnimation = (e: MouseEvent) => {
      const animeEl = document.createElement('span');
      if (options?.animationType !== 'inner') {
        parentRef.style.zIndex = '1';
        animeEl.style.width = `${parentRef.clientWidth}px`;
        animeEl.style.height = `${parentRef.clientHeight}px`;
        const color =
          options?.color ||
          styles.getPropertyValue('background') ||
          styles.getPropertyValue('background-color') ||
          defaultOptions.color;
        animeEl.style.background = color;
        animeEl.style.zIndex = '-1';
        animeEl.style.position = 'absolute';
        animeEl.style.top = '0';
        animeEl.style.left = '0';
        animeEl.style.transformOrigin = 'center';
        animeEl.style.borderRadius = styles.getPropertyValue('border-radius');
      } else {
        parentRef.style.overflow = 'hidden';
        const diameter = Math.max(
          parentRef.clientHeight,
          parentRef.clientWidth
        );
        const radius = diameter / 2;
        animeEl.style.borderRadius = '50%';
        animeEl.style.width = `${diameter}px`;
        animeEl.style.height = `${diameter}px`;
        animeEl.style.background = options?.color || defaultOptions.color;
        animeEl.style.position = 'absolute';
        animeEl.style.top = `${e.clientY - parentRef.offsetTop - radius}px`;
        animeEl.style.left = `${e.clientX - parentRef.offsetLeft - radius}px`;
      }

      const duration = options?.duration || defaultOptions.duration;
      const scale = options?.scale || defaultOptions.scale;
      parentRef.appendChild(animeEl);
      animeEl.animate(
        [
          { transform: 'scale(1)', opacity: '1' },
          { transform: `scale(${scale})`, opacity: '0' },
        ],
        { duration, fill: 'forwards' }
      );

      const t = setTimeout(() => {
        animeEl.remove();
        clearTimeout(t);
      }, duration);
    };

    parentRef.addEventListener('click', HandleAnimation);

    return () => {
      parentRef.removeEventListener('click', HandleAnimation);
    };
  }, [ref, options]);
};
