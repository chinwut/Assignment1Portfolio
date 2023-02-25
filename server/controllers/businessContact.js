const express = require('express');
const router = express.Router();
const BusinessContact = require('../models/businessContact');

// Display the list of business contacts
module.exports.displayBusinessContactList = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  BusinessContact.find((err, businessContactList) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.render('businessContact/list', {
      title: 'Business Contacts',
      businessContactList: businessContactList,
      displayName: req.user ? req.user.displayName : '',
    });
  });
};

// Display the add business contact page
module.exports.displayAddPage = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  res.render('businessContact/add', {
    title: 'Add Business Contact',
    displayName: req.user ? req.user.displayName : '',
  });
};

// Process the add business contact form
module.exports.processAddPage = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const newBusinessContact = new BusinessContact({
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    emailAddress: req.body.emailAddress,
  });

  BusinessContact.create(newBusinessContact, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect('/business-list');
  });
};

// Display the edit business contact page
module.exports.displayEditPage = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const id = req.params.id;

  BusinessContact.findById(id, (err, businessContactToEdit) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.render('businessContact/edit', {
      title: 'Edit Business Contact',
      businessContact: businessContactToEdit,
      displayName: req.user ? req.user.displayName : '',
    });
  });
};

// Process the edit business contact form
module.exports.processEditPage = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const id = req.params.id;
  const updatedBusinessContact = new BusinessContact({
    _id: id,
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    emailAddress: req.body.emailAddress,
  });

  BusinessContact.updateOne({ _id: id }, updatedBusinessContact, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect('/business-list');
  });
};

// Delete a business contact
module.exports.performDelete = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const id = req.params.id;

  BusinessContact.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect('/business-list');
  });
};