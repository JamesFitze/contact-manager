const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

/**
 * GET /contacts
 */
router.get('/', async (req, res) => {
  try {
    const { lastname } = req.query;
    const filter = lastname
      ? { lastName: { $regex: `^${lastname}$`, $options: 'i' } }
      : {};
    const contacts = await Contact.find(filter).sort({ lastName: 1, firstName: 1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /contacts
 */
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * PUT /contacts/:_id
 */
router.put('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const updated = await Contact.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /contacts/:_id
 */
router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const deleted = await Contact.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Support :id as alias for :_id
router.put('/:id', async (req, res) => {
  req.params._id = req.params.id;
  delete req.params.id;
  return router.handle(req, res);
});
router.delete('/:id', async (req, res) => {
  req.params._id = req.params.id;
  delete req.params.id;
  return router.handle(req, res);
});

module.exports = router;
