export {};

declare global {
  interface Window {
    electron: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      // Add any other electron methods you need
    };
  }
}