import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../features/notifications/notificationSlice';

export const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.bitcoin || data.ethereum || data.solana) {
        Object.entries(data).forEach(([key, value]) => {
          const price = parseFloat(value as string);
          if (!isNaN(price)) {
            dispatch(
              addNotification({
                id: Date.now(),
                type: 'price_alert',
                message: `${key.toUpperCase()} price update: $${price.toFixed(2)}`,
                timestamp:Date.now()
              })
            );
          }
        });
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, dispatch]);

  return socketRef.current;
};