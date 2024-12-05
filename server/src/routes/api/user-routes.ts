import express from 'express';

const router = express.Router();
import {
  getSingleUser,
  saveBook,
  deleteBook,
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../services/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').put(authenticateToken, saveBook);

router.route('/me').get(authenticateToken, getSingleUser);

router.route('/books/:bookId').delete(authenticateToken, deleteBook);




export default router;
