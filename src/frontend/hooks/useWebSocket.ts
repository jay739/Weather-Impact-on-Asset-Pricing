import { useState, useEffect, useCallback } from 'react';

interface WebSocketHookProps {
  url: string;
  onMessage?: (data: any) => void;
}

export const useWebSocket = ({ url, onMessage }: WebSocketHookProps) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (event) => {
      setError('WebSocket error occurred');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage?.(data);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url, onMessage]);

  const sendMessage = useCallback((data: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    }
  }, [socket]);

  return { isConnected, error, sendMessage };
};