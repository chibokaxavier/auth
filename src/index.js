const app = require("./app");
const { PORT } = process.env;


const startApp =  () => {
  app.listen(PORT, () => {
    console.log(`auth backenbd running on port ${PORT}`);
  });
};

startApp();
