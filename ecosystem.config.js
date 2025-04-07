module.exports = {
  apps: [
    {
      name: "react-app",
      script: "npx",
      args: "serve -s dist -l 3000",
      interpreter: "bash"
    }
  ]
};

