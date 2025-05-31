// src/utils/helpers.js

/**
 * Formats a given number of seconds into a MM:SS string.
 * @param {number} seconds - The total number of seconds.
 * @returns {string} Formatted time string (e.g., "05:30").
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};
