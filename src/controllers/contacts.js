import { getAllContacts, getContactById } from '../services/contacts.js';
import { ContactsCollection } from '../db/models/Contact.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export const getContactByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

// Geçici seed endpoint - sadece ilk deploy için
export const seedContactsController = async (req, res) => {
  try {
    const contactsPath = join(__dirname, '../../contacts.json');
    const contactsData = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
    
    // Mevcut verileri temizle
    await ContactsCollection.deleteMany({});
    
    // Yeni verileri ekle
    const result = await ContactsCollection.insertMany(contactsData);
    
    res.status(200).json({
      status: 200,
      message: 'Database seeded successfully!',
      data: {
        inserted: result.length,
        contacts: result
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error seeding database',
      error: error.message,
    });
  }
};