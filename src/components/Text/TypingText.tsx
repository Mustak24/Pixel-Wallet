import { useState, useEffect } from 'react';
import { TextTheme } from '../../Contexts/ThemeProvider';

type TypingHeadingProps = {
    text: string;
    speed?: number;
    style?: object;
}

export default function TypingText({ text, speed = 100, style } : TypingHeadingProps) : React.JSX.Element {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
        if (currentIndex === text.length) return clearInterval(interval);
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return <TextTheme style={style}>{displayedText}</TextTheme>;
};