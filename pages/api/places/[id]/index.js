// import { places } from "../../../../lib/db.js";
import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const place = await Place.findById(id);

      if (!place) {
        response.status(404).json({ status: "Not found" });
        return;
      }
      response.status(200).json(place);
    }

    if (request.method === "PUT") {
      const placeData = request.body;
      const place = await Place.findByIdAndUpdate(id, placeData);

      if (!place) {
        response.status(404).json({ status: "Not found" });
        return;
      }

      response.status(200).json({ status: "Place was updated" });
    }

    if (request.method === "DELETE") {
      const place = await Place.findByIdAndDelete(id);
      console.log("place:", place);

      if (!place) {
        response.status(404).json({ status: "Not found" });
        return;
      }

      response.status(200).json({ status: "Place was deleted" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }

  response.status(405).json({ status: "Method not allowed" });
}
