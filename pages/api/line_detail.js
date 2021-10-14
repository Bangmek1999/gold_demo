import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import axios from "axios";
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method === "POST") {
    var id = req.body.id;
    const response = await axios.get(
      "https://api.line.me/v2/bot/profile/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "i+ceG1sQM6SyNOV25l8nOvNisgqysASBXeiRzzcvy2pyDlPbXVfHzDpCxrjrhhx7q+Oy4kZRAGjE3CXw0iJVuDIrxobbgR666FosJgUaFyBrao2fW3FZc3liSZdKw9w+VGOXC9djslAMDYvbZ1vkEwdB04t89/1O/w1cDnyilFU=",
        },
      }
    );
    var data = response.data;
    return res.status(200).json({ data });
  }
}
