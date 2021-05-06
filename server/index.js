import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import graphQlSchema from "./schema/index.js";
import graphQlResolvers from "./resolvers/index.js";
import auth from "./middleware/auth.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));

app.use(auth);
app.use(cors());

// GRAPHQL API
app.use(
  "/api",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 6000;

// MONGODB CONNECTION
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
