import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0", // Expose to all network interfaces
        port: 5173, // Use the same port as mapped in Docker
    },
});
