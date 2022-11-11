/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    if (!isServer) config.resolve.fallback.child_process = false;
    if (!isServer) config.resolve.fallback.net = false;
    if (!isServer) config.resolve.fallback.http2 = false;
    if (!isServer) config.resolve.fallback.tls = false;
    return config;
  }
};
