// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
// import path from "path";
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
// import { fileURLToPath } from "url";

// // ✅ Define __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ You can't use top-level `await` here, so use a helper
// async function getConfig() {
//   return defineConfig({
//     plugins: [
//       react(),
//       runtimeErrorOverlay(),
//       themePlugin(),
//       ...(process.env.NODE_ENV !== "production" &&
//       process.env.REPL_ID !== undefined
//         ? [
//             (await import("@replit/vite-plugin-cartographer")).cartographer(),
//           ]
//         : []),
//     ],
//     resolve: {
//       alias: {
//         '@': path.resolve(__dirname, 'client/src'),
//         "@shared": path.resolve(__dirname, "shared"),
//         "@assets": path.resolve(__dirname, "attached_assets"),
//       },
//     },
//     root: path.resolve(__dirname, "client"),
//     build: {
//       outDir: path.resolve(__dirname, "dist/public"),
//       emptyOutDir: true,
//     },
//   });
// }

// export default getConfig();
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
});
