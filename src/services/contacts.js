import { ContactsCollection } from '../db/models/Contact.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  // Add userId filter
  if (userId) {
    contactsQuery.where('userId').equals(userId);
  }

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .exec(),
  ]);

  const totalPages = Math.ceil(contactsCount / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: contactsCount,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  let photo;
  if (payload.photo) {
    photo = await saveFileToCloudinary(payload.photo, 'photos');
  }

  const contact = await ContactsCollection.create({
    ...payload,
    photo,
  });
  return contact;
};

export const updateContact = async (contactId, payload, userId, options = {}) => {
  let photo;
  if (payload.photo) {
    photo = await saveFileToCloudinary(payload.photo, 'photos');
  }

  const updatedPayload = { ...payload };
  if (photo) {
    updatedPayload.photo = photo;
  }

  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    updatedPayload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};