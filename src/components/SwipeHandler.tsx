import { useSwipeable } from 'react-swipeable';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface SwipeHandlerProps {
  children: ReactNode;
}

export default function SwipeHandler({ children }: SwipeHandlerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Swipe left goes to blog
      if (location.pathname !== '/blog') {
        navigate('/blog');
      }
    },
    onSwipedRight: () => {
      // Swipe right goes to home
      if (location.pathname !== '/') {
        navigate('/');
      }
    },
    trackMouse: false,
    // Adjust these for sensitivity
    swipeDuration: 500,
    preventScrollOnSwipe: false,
    delta: 50,
  });

  return (
    <div {...handlers} className="h-full w-full">
      {children}
    </div>
  );
} 