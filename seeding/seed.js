import { MongoClient } from "mongodb";
import pkg from "mongodb";
const { ObjectId } = pkg;

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect("mongodb://localhost:27017");
    _db = _connection.db("plannr");
  }

  return _db;
};
const closeConnection = async () => {
  await _connection.close();
};

const db = await dbConnection();
await db.dropDatabase();

const usersCol = await db.collection("users");

const test1 = {
  user_id: "jinR9wNa6ahmUFTFUadLWMQz65h1",
  current_trip: new ObjectId("658509c0384b2a69e56fa170"),
  trips: [
    {
      trip_id: new ObjectId("658509c0384b2a69e56fa170"),
      name: "Your Trip",
      places: [
        "ChIJjTtIW19XwokRkk9pWPXEiag",
        "ChIJ4_tHjN9ZwokRK_1TEtn52yQ",
        "ChIJv_z2FgZZwokRMSQLdjWJU3E",
        "ChIJf1msPAFXwokRbkE3_lFxL9w",
        "ChIJsYJBfl9XwokRZpOdm5tGNi8",
        "ChIJCfI31UFXwokRCM17f_sS32E",
        "ChIJ__-DlN9ZwokRPnVsSyzpXc0",
      ],
    },
  ],
};

const test2 = {
  user_id: "JDMfziXHUGcqps9WO7dFTPzfFDf1",
  current_trip: new ObjectId("65850cad384b2a69e56fa172"),
  trips: [
    {
      trip_id: new ObjectId("65850cad384b2a69e56fa172"),
      name: "Your Trip",
      places: [
        "ChIJuxB3XzlTwokRmfE3bhndIvc",
        "ChIJlwuHlaisw4kRK8N1-s6kEK4",
        "ChIJl613kdO1w4kROjmjoXThIPA",
        "ChIJcRdG9BTBw4kRqhf6SD51D10",
      ],
    },
  ],
};

const test3 = {
  user_id: "K3u5EcBKJmeIiY9pcp2P2ZKIZVg1",
  current_trip: new ObjectId("65850d35384b2a69e56fa174"),
  trips: [
    {
      trip_id: new ObjectId("65850d35384b2a69e56fa174"),
      name: "Your Trip",
      places: [],
    },
  ],
};

await usersCol.insertMany([test1, test2, test3]);

console.log("Done.");
await closeConnection();
