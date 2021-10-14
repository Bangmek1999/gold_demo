import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
dbConnect();
const line = require("@line/bot-sdk");
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);
export default async function handler(req, res) {
  await cors(req, res);
  const users = await User.find({ user_id: req.body.data.user_id });
  const owner = await User.find({ user_id: req.body.data.owner_id });
  const client = new line.Client({
    channelAccessToken:
      "i+ceG1sQM6SyNOV25l8nOvNisgqysASBXeiRzzcvy2pyDlPbXVfHzDpCxrjrhhx7q+Oy4kZRAGjE3CXw0iJVuDIrxobbgR666FosJgUaFyBrao2fW3FZc3liSZdKw9w+VGOXC9djslAMDYvbZ1vkEwdB04t89/1O/w1cDnyilFU=",
  });
  const message = {
    type: "text",
    text:
      "คุณได้เข้าร่วมห้องหมายเลข " + req.body.data.room_id + " เรียบร้อยแล้ว",
  };
  client.pushMessage(users[0].user_line_id, message).then((res) => {});
  const message2 = {
    type: "text",
    text:
      "คุณ " +
      users[0].fname +
      " " +
      users[0].lname +
      " ได้เข้าร่วมห้องออมของคุณ ที่ห้องหมายเลข " +
      req.body.data.room_id,
  };
  client.pushMessage(owner[0].user_line_id, message2).then((res) => {});
  res.json({ message: "success" });
}
