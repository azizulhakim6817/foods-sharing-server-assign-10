import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || "8000";

//!middleware------------
app.use(express.json());
app.use(cors());

//! Database------------
const client = new MongoClient(process.env.DATABASE, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    //await client.connect();
    const db = client.db("plateShare");
    const foodsCollection = db.collection("foods");
    const foodRequestCollection = db.collection("food-request");

    //! Food Request Submissions collectons-------------
    app.post("/food-request", async (req, res) => {
      const { foodId } = req.body;

      const result = await foodRequestCollection.insertOne({
        ...req.body,
        foodId: new ObjectId(foodId),
        status: "pending",
        createdAt: new Date(),
      });
      res.status(201).json({ message: "food requested successfully", result });
    });

    //! Food Owner--> Only food request will show the Food Request Table--
    app.get("/food-request-owner/:id", async (req, res) => {
      try {
        const foodId = req.params.id;
        const userEmail = req.query.userEmail;

        if (!userEmail) {
          return res.status(400).json({ message: "User email required" });
        }

        // Food find-------
        const food = await foodsCollection.findOne({
          _id: new ObjectId(foodId),
        });

        if (!food) {
          return res.status(404).json({ message: "Food not found" });
        }

        // Owner check (MOST IMPORTANT)------
        if (food.donator_email !== userEmail) {
          return res.status(403).json({
            message: "Access denied. Only food owner can see requests",
          });
        }

        // Get all requests for this food----
        const requests = await foodRequestCollection
          .find({ foodId: new ObjectId(foodId) })
          .toArray();

        res.status(200).json({
          message: "Food requests fetched successfully",
          result: requests,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    //! Request status will be changed to accepted---------
    app.post("/request-accepted/:id", async (req, res) => {
      const requestId = req.params.id;

      // id by foodrequestcollceton ---------
      const request = await foodRequestCollection.findOne({
        _id: new ObjectId(requestId),
      });

      // food requestcollceton ---------
      await foodRequestCollection.updateOne(
        { _id: new ObjectId(requestId) },
        {
          $set: {
            status: "accepted",
          },
        },
      );

      if (!request) {
        return res.status(400).json({ message: "RequestId isn't found!" });
      }
      // foods collceltion---------
      await foodsCollection.updateOne(
        {
          _id: new ObjectId(request.foodId),
        },
        { $set: { food_status: "donated" } },
      );

      return res.status(200).json({ message: "Food request accepted" });
    });

    //! food-request-rejected--------------------
    app.post("/food-request-rejected/:id", async (req, res) => {
      await foodRequestCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status: "rejected" } },
      );

      res.json({ message: "Request rejected" });
    });

    //! my-food-my-food-request
    app.get("/my-food-request", async (req, res) => {
      try {
        const data = await foodRequestCollection.find().toArray();
        return res
          .status(200)
          .json({ message: "My food request successfully", data });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch food requests" });
      }
    });

    //! creae foods---------------------------*/
    app.post("/create-foods", async (req, res) => {
      try {
        const newFood = req.body;
        const food = await foodsCollection.insertOne({
          ...newFood,
          createdAt: new Date(),
        });
        return res
          .status(201)
          .json({ message: "Food created successfully", food });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    //! get food (food_status)----------------------
    app.get("/get-foods", async (req, res) => {
      try {
        const result = await foodsCollection
          .find({ food_status: "Available" })
          .sort({ foodQuantity: -1 })
          .toArray();

        return res.status(200).json({ message: "Get all foods", result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    //! food details -----------------------------------
    app.get("/food-details/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const foodId = { _id: new ObjectId(id) };
        const result = await foodsCollection.findOne(foodId);
        return res
          .status(200)
          .json({ message: "Food details are find", result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    //! manage my foods by email ------------------
    app.get("/manage-my-foods/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { donator_email: email };

        const data = await foodsCollection.find(query).toArray();
        return res.status(200).json({ message: "Foods find by email", data });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    //! update my nanage foods---------------------
    app.post("/food-update/:id", async (req, res) => {
      try {
        const reqBody = req.body;
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const update = { $set: reqBody };

        const result = await foodsCollection.updateOne(query, update);
        return res.status(200).json({ message: "Food is updated now", result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    //! delete my manage food --------------------
    app.delete("/food-delete/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        await foodsCollection.deleteOne(query);
        return res.status(200).json({ message: "Food deleted succssullty" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    //* database run console----------------------------
    //await client.db("admin").command({ ping: 1 });
    console.log(
      "🔐 Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`✅ Server is running port : ${port}`);
});
