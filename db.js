import mongoose from "mongoose";

export function dbConnection() {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    // monmongoose.connect("mongodb://127.0.0.1:27017/interview", params);
    mongoose.connect(
      "mongodb+srv://sivapucc:siva95@cluster0.zdqwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/interview",
      params
    );

    console.log("db connected successfully");
  } catch (error) {
    console.log(error);
  }
}
