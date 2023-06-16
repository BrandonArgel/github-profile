import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Add the paths required for the aliases
const paths = [
  "assets",
  "components",
  "containers",
  "context",
  "constants",
  "hooks",
  "styles",
  "utils",
]

const aliases = {};
// Function to create paths like so: '@': path.resolve(__dirname, './src'),
const getAliases = () => {
  paths.forEach((p) => {
    aliases[`@${p}`] = path.resolve(__dirname, `./src/${p}`)
  })

  return aliases
}

getAliases()

interface config {
  resolve: object;
  plugins: any[]
  [key: string]: any;
}

/**
 * Initial configuration for Vite
 */
export default defineConfig(({ mode }) => {
  const config: config = {
    plugins: [react()],
    resolve: {
      alias: {
        ...aliases,
        'node-fetch': 'isomorphic-fetch',
      }
    },
    define: {
      global: {}
    }
  }

  if (mode === 'development') {
    const env = loadEnv(mode, process.cwd())

    config.server = {
      port: env.VITE_PORT || 3000,
    }
  }

  return config
})