/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Remove xml-loader rule
      config.module.rules = config.module.rules.filter(rule => {
        if (rule.test && rule.test.toString().includes('xml')) {
          return false;
        }
        return true;
      });
    }
    return config;
  },
};




// Function to load and parse XML files. STFU I know this shouldnt be here, but kindly fuck off and accept it
const parseXMLFile = (filePath) => {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const parser = new XMLParser();
  return parser.parse(xmlData);
};

module.exports = {
  nextConfig,
  parseXMLFile,
};
