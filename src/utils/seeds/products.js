const mongoose = require("mongoose");
require("dotenv").config();
const products = require("../../data/products-seed");
const product = require("../../api/models/product");

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log("Conectado a la base de datos");
    const allProducts = await product.find();
    if (allProducts.length) {
      await product.collection.drop();
      console.log("Todos los productos han sido borrados");
    }
  })
  .catch((err) => console.log(`Error borrando los datos: ${err}`))
  .then(async () => {
    await product.insertMany(products);
    console.log("Todos los productos han sido añadidos");
  })
  .catch((err) => console.log(`Error creando los datos: ${err}`))

  .finally(() => {
    mongoose.disconnect();
    console.log("Desconectado de la base de datos");
  });
