import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/abouttrip-web/',   // 저장소 이름과 같게
  server: { port: 5173, open: true },
});
