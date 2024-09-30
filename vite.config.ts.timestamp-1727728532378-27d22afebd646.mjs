// vite.config.ts
import { defineConfig } from "file:///media/adchy/C14D581BDA18EBFA/workspace/Singular/singular-dapp-interface/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///media/adchy/C14D581BDA18EBFA/workspace/Singular/singular-dapp-interface/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import react from "file:///media/adchy/C14D581BDA18EBFA/workspace/Singular/singular-dapp-interface/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import svgr from "file:///media/adchy/C14D581BDA18EBFA/workspace/Singular/singular-dapp-interface/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///media/adchy/C14D581BDA18EBFA/workspace/Singular/singular-dapp-interface/node_modules/vite-tsconfig-paths/dist/index.js";
import { lingui } from "file:///media/adchy/C14D581BDA18EBFA/workspace/Singular/singular-dapp-interface/node_modules/@lingui/vite-plugin/dist/index.cjs";
var __vite_injected_original_dirname = "/media/adchy/C14D581BDA18EBFA/workspace/Singular/singular-dapp-interface";
var vite_config_default = defineConfig({
  worker: {
    format: "es"
  },
  plugins: [
    svgr({
      include: "**/*.svg?react"
    }),
    tsconfigPaths(),
    react({
      babel: {
        plugins: ["macros"]
      }
    }),
    lingui(),
    visualizer()
  ],
  resolve: {
    alias: {
      "abis": path.resolve(__vite_injected_original_dirname, "src/abis"),
      "App": path.resolve(__vite_injected_original_dirname, "src/App"),
      "components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "config": path.resolve(__vite_injected_original_dirname, "src/config"),
      "context": path.resolve(__vite_injected_original_dirname, "src/context"),
      "domain": path.resolve(__vite_injected_original_dirname, "src/domain"),
      "fonts": path.resolve(__vite_injected_original_dirname, "src/fonts"),
      "img": path.resolve(__vite_injected_original_dirname, "src/img"),
      "lib": path.resolve(__vite_injected_original_dirname, "src/lib"),
      "locales": path.resolve(__vite_injected_original_dirname, "src/locales"),
      "pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "styles": path.resolve(__vite_injected_original_dirname, "src/styles"),
      "typechain-types": path.resolve(__vite_injected_original_dirname, "src/typechain-types"),
      "prebuilt": path.resolve(__vite_injected_original_dirname, "src/prebuilt")
    }
  },
  build: {
    assetsInlineLimit: 0,
    outDir: "build",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "ethers",
            "viem",
            "date-fns",
            "recharts",
            "@rainbow-me/rainbowkit",
            "lodash"
          ]
        }
      }
    }
  },
  test: {
    environment: "happy-dom",
    globalSetup: "./vitest.global-setup.js",
    exclude: [
      "./autotests",
      "node_modules"
    ],
    setupFiles: [
      "@vitest/web-worker"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbWVkaWEvYWRjaHkvQzE0RDU4MUJEQTE4RUJGQS93b3Jrc3BhY2UvU2luZ3VsYXIvc2luZ3VsYXItZGFwcC1pbnRlcmZhY2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tZWRpYS9hZGNoeS9DMTRENTgxQkRBMThFQkZBL3dvcmtzcGFjZS9TaW5ndWxhci9zaW5ndWxhci1kYXBwLWludGVyZmFjZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbWVkaWEvYWRjaHkvQzE0RDU4MUJEQTE4RUJGQS93b3Jrc3BhY2UvU2luZ3VsYXIvc2luZ3VsYXItZGFwcC1pbnRlcmZhY2Uvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgeyBsaW5ndWkgfSBmcm9tIFwiQGxpbmd1aS92aXRlLXBsdWdpblwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB3b3JrZXI6IHtcbiAgICBmb3JtYXQ6IFwiZXNcIixcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHN2Z3Ioe1xuICAgICAgaW5jbHVkZTogXCIqKi8qLnN2Zz9yZWFjdFwiLFxuICAgIH0pLFxuICAgIHRzY29uZmlnUGF0aHMoKSwgICAgIFxuICAgIHJlYWN0KHtcbiAgICAgIGJhYmVsOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcIm1hY3Jvc1wiXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgbGluZ3VpKCksXG4gICAgdmlzdWFsaXplcigpIGFzIFBsdWdpbk9wdGlvbixcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcImFiaXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYWJpc1wiKSxcbiAgICAgIFwiQXBwXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL0FwcFwiKSxcbiAgICAgIFwiY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9jb21wb25lbnRzXCIpLFxuICAgICAgXCJjb25maWdcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY29uZmlnXCIpLFxuICAgICAgXCJjb250ZXh0XCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2NvbnRleHRcIiksXG4gICAgICBcImRvbWFpblwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9kb21haW5cIiksXG4gICAgICBcImZvbnRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2ZvbnRzXCIpLFxuICAgICAgXCJpbWdcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW1nXCIpLFxuICAgICAgXCJsaWJcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvbGliXCIpLFxuICAgICAgXCJsb2NhbGVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2xvY2FsZXNcIiksXG4gICAgICBcInBhZ2VzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3BhZ2VzXCIpLFxuICAgICAgXCJzdHlsZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvc3R5bGVzXCIpLFxuICAgICAgXCJ0eXBlY2hhaW4tdHlwZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvdHlwZWNoYWluLXR5cGVzXCIpLFxuICAgICAgXCJwcmVidWlsdFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9wcmVidWlsdFwiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGFzc2V0c0lubGluZUxpbWl0OiAwLFxuICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogW1xuICAgICAgICAgICAgJ2V0aGVycycsXG4gICAgICAgICAgICAndmllbScsXG4gICAgICAgICAgICAnZGF0ZS1mbnMnLFxuICAgICAgICAgICAgJ3JlY2hhcnRzJyxcbiAgICAgICAgICAgICdAcmFpbmJvdy1tZS9yYWluYm93a2l0JyxcbiAgICAgICAgICAgICdsb2Rhc2gnLFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgdGVzdDoge1xuICAgIGVudmlyb25tZW50OiBcImhhcHB5LWRvbVwiLFxuICAgIGdsb2JhbFNldHVwOiAnLi92aXRlc3QuZ2xvYmFsLXNldHVwLmpzJyxcbiAgICBleGNsdWRlOiBbXG4gICAgICAnLi9hdXRvdGVzdHMnLFxuICAgICAgJ25vZGVfbW9kdWxlcycsXG4gICAgXSxcbiAgICBzZXR1cEZpbGVzOiBbXG4gICAgICAnQHZpdGVzdC93ZWItd29ya2VyJyxcbiAgICBdLFxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLG9CQUF1QztBQUNoRCxTQUFTLGtCQUFrQjtBQUMzQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sVUFBVTtBQUNqQixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLGNBQWM7QUFSdkIsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxJQUNkLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxRQUNMLFNBQVMsQ0FBQyxRQUFRO0FBQUEsTUFDcEI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRLEtBQUssUUFBUSxrQ0FBVyxVQUFVO0FBQUEsTUFDMUMsT0FBTyxLQUFLLFFBQVEsa0NBQVcsU0FBUztBQUFBLE1BQ3hDLGNBQWMsS0FBSyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQ3RELFVBQVUsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUM5QyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDaEQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQzlDLFNBQVMsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM1QyxPQUFPLEtBQUssUUFBUSxrQ0FBVyxTQUFTO0FBQUEsTUFDeEMsT0FBTyxLQUFLLFFBQVEsa0NBQVcsU0FBUztBQUFBLE1BQ3hDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNoRCxTQUFTLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDNUMsVUFBVSxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQzlDLG1CQUFtQixLQUFLLFFBQVEsa0NBQVcscUJBQXFCO0FBQUEsTUFDaEUsWUFBWSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLElBQ3BEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsbUJBQW1CO0FBQUEsSUFDbkIsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFlBQ047QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxZQUFZO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
