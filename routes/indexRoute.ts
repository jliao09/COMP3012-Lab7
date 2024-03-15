import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { database, userModel, User } from '../models/userModel';

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

// Admin dashboard route
router.get('/admin', ensureAuthenticated, (req, res) => {
  if (req.user?.role === 'admin') {
    const sessions = database.filter(user => user.sessionID); // Get users with active sessions
    res.render('admin', {
      user: req.user,
      sessions: sessions
    });
  } else {
    res.status(403).send('Forbidden');
  }
});

// Session revocation route
router.post('/admin/revoke', ensureAuthenticated, (req, res) => {
  const sessionId = req.body.sessionId;

  // Destroy the session in the session store
  req.sessionStore.destroy(sessionId, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const userIndex = database.findIndex(user => user.sessionID === sessionId);
    if (userIndex !== -1) {
      database[userIndex].sessionID = undefined;
    }

    // Redirect to admin to refresh the list of sessions
    res.redirect('/admin');
  });
});


export default router;
