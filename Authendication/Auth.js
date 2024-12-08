import jwt from "jsonwebtoken";
const isAuthenticated = async (req) => {
  try {
    const decode = jwt.verify(req, process.env.SECRET_KEY);
    console.log(decode);
    const name = await User.findById(decode.id).select("_id name email");
    return name;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid Authorization" });
  }
};

export { isAuthenticated };
