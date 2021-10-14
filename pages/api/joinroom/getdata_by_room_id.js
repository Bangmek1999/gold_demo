import dbConnect from "../../../utils/dbConnect";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const joinrooms = await JoinRooms.find({
          room_id: req.body.data.room_id,
        });

        res.status(200).json({ success: true, data: joinrooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
