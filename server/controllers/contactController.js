import ContactMessage from '../models/ContactMessage.js';

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new message document
    const newMessage = new ContactMessage({
      name,
      email,
      message,
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending the message' });
  }
};
