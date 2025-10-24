import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from '../services/contacts.js';
import { ContactsCollection } from '../db/models/Contact.js';
import createHttpError from 'http-errors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getContactsController = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = parseInt(req.query.perPage, 10) || 10;
  const sortBy = req.query.sortBy || '_id';
  const sortOrder = req.query.sortOrder || 'asc';

  const filter = {};
  if (req.query.type) {
    filter.type = req.query.type;
  }
  if (req.query.isFavourite !== undefined) {
    filter.isFavourite = req.query.isFavourite === 'true';
  }

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;

  const contact = await createContact({
    ...req.body,
    photo,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const photo = req.file;

  const result = await updateContact(contactId, {
    ...req.body,
    photo,
  }, req.user._id);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
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