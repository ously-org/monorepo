import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ously/ui"],
};

export default nextConfig;
