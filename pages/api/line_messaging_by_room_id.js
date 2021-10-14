import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import JoinRooms from "../../models/JoinRooms";
import SavingRooms from "../../models/SavingRooms";
import dbConnect from "../../utils/dbConnect";
dbConnect();
const line = require("@line/bot-sdk");
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);
export default async function handler(req, res) {
  await cors(req, res);
  console.log(req.body.data);
  const joinrooms = await JoinRooms.find({
    room_id: req.body.data.room_id,
  });
  const savingrooms = await SavingRooms.find({
    room_id: req.body.data.room_id,
  });
  var alert_total = parseInt(savingrooms[0].alert_total) + 1;

  const filter = { room_id: req.body.data.room_id };
  const update = {
    alert_status: "sended",
    alert_total: alert_total,
  };
  await SavingRooms.findOneAndUpdate(filter, update);

  // line noti
  const client = new line.Client({
    channelAccessToken:
      "i+ceG1sQM6SyNOV25l8nOvNisgqysASBXeiRzzcvy2pyDlPbXVfHzDpCxrjrhhx7q+Oy4kZRAGjE3CXw0iJVuDIrxobbgR666FosJgUaFyBrao2fW3FZc3liSZdKw9w+VGOXC9djslAMDYvbZ1vkEwdB04t89/1O/w1cDnyilFU=",
  });

  for (let index = 0; index < joinrooms.length; index++) {
    const element = joinrooms[index];
    // line noti คนออมครบ แต่ยังไม่ถอน
    if (element.status === "finished") {
      const message = {
        type: "text",
        text:
          "ห้องหมายเลข " +
          savingrooms[0].token +
          " ที่คุณออมอยู่ได้เลยกำหนดการออมแล้ว\nกรุณาทำรายการถอน",
      };
      client.pushMessage(element.user_id, message).then((res) => {});
    }
    // line noti คนออมไม่ครบ ให้ไปยกเลิก
    if (element.status === "saving") {
      const message = {
        type: "text",
        text:
          "ห้องหมายเลข " +
          savingrooms[0].token +
          " ที่คุณออมอยู่ได้เลยกำหนดการออมแล้ว\nกรุณาทำรายการยกเลิก",
      };
      client.pushMessage(element.user_id, message).then((res) => {});
    }
  }

  // const message = {
  //   type: "text",
  //   text: req.body.data.messages,
  // };
  // client.pushMessage(req.body.data.user_id, message).then((res) => {});
  res.json({ message: "success" });
}
