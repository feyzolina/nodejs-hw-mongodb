import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
  seedContactsController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();

// Routes
router.get('/contacts', authenticate, ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', authenticate, isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts', authenticate, upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', authenticate, isValidId, upload.single('photo'), validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', authenticate, isValidId, ctrlWrapper(deleteContactController));

// Geçici seed endpoint - sadece ilk deploy için
router.post('/seed', ctrlWrapper(seedContactsController));

export default router;