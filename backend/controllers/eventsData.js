import EventModel from "../models/EventModel.js";

export const getEvents = async (req, res) => {
  let events;
  const {uid} = req
  try {
    events = await EventModel.find({ uid })
  } catch (error) {
    console.error("Error getting events:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching events data." });
  }
  res.status(200).json(events);
};

export const addEvent = async (req, res) => {
  const { eventData } = req.body;
  const {uid} = req
  try {
    const newEvent = new EventModel({
        ...eventData,
        uid,
      })
   await newEvent.save()
   
   return res.status(200).json(newEvent);
  } catch (error) {
    console.error("Error adding events:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding an event." });
  }
};

// export const addEventNote = async (req, res) => {
//   const { eventId, note } = req.body;
//   let updatedNote;
//   try {
//     const event = await EventModel.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }
//     // Concatenate new note with existing notes
//     updatedNote = event.note ? `${event.note}\n${note}` : note;
//     event.note = updatedNote;

//     // Save updated event
//     await event.save();
//   } catch (error) {
//     console.error("Error adding event note:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while adding an event note" });
//   }
//   res.status(200).json(updatedNote);
// };
