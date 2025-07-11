import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

await connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `✔️  Server running on port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log("Error occured at main index", err));
