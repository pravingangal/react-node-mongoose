import mongoose from "mongoose";

async function dbConnect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_HOST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;

    db.on("error", () => {
      reject(null);
    });
    db.once("open", () => {
      resolve(db);
    });
  });
}

export default dbConnect;
