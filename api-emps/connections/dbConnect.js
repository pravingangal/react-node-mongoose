import mongoose from "mongoose";

async function dbConnect() {
      return  new Promise((resolve, reject) => {

        mongoose.connect(process.env.DB_HOST_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }).then((db)=> resolve(db))
        .catch((err)=>reject(null))

      });
}
export default dbConnect;
