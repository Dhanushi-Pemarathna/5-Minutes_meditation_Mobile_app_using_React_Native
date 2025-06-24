import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const lightColors = {
  background: '#ffffff',
  text: '#000000',
  card: '#f0f4f8',
  button: '#4e73df',
};

const darkColors = {
  background: '#2C2C2E',     
  text: '#E5E5EA',            
  card: '#3A3A3C',
  button: '#5e8bff',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
