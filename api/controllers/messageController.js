import Message from "../models/messageModel"

// Get all messages
export const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.find({});
    if (!messages.length) {
      return res.status(404).json({
        error: "No messages found"
      });
    }

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    });
  }
}

// Get message by ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({
        error: "Message not found"
      });
    }
    
    res.json(message)

  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    });
  }
}

// Create a message
export const createMessage = async (req, res) => {
  try {
    const messageData = req.body;

    if (Object.keys(messageData).length === 0) {
      return res.status(404).json({
        error: "No message data found"
      });
    }

    const messageCreated = await Message.create(messageData);

    res.json({
      message: `Message was created successfully ${messageCreated}`
    });
  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    });
  }
}

// Update a message by ID
export const updateMessageByID = async (req, res) => {
  try {
    const { id } = req.params;
    const messageData = req.body;
    const messageToUpdate = await Message.findById(id);
    if (!messageToUpdate) {
      return res.status(404).json({
        error: `Could not find a message with ID ${id}`
      });
    }

    Object.entries(messageData).forEach(([key, value]) => {
      messageToUpdate[key] = value;
    })
    await messageToUpdate.save();

    res.json({
      message: "Message was updated successfully"
    })

  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    });
  }
}

// Delete a message by ID
export const messageDeleteByID = async (req, res) => {
  try {
    const { id } = req.params;
    const messageToDelete = await Message.findByIdAndDelete(id);
    if (!messageToDelete) {
      return res.status(404).json({
        error: "Message not found and was not deleted"
      });
    }

    res.json({
      message: "Message was deleted successfully"
    })

  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    });
  }
}
