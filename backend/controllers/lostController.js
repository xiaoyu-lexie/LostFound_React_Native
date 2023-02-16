const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Lost = require("../models/lostModel");

exports.addNewLost = async (parent, args) => {
  const lost = {
    title: args.title,
    location: args.location,
    description: args.description,
    date: args.date,
    contact: args.contact,
  };

  try {
    const newLost = new Lost(lost);

    await newLost.save();

    return {
      title: lost.title,
      location: lost.location,
      description: lost.description,
      date: lost.date,
      contact: lost.contact,
    };
  } catch (e) {
    throw e;
  }
};

exports.fetchAllLosts = async () => {
  try {
    const losts = await Lost.find();

    return losts;
  } catch (e) {
    throw e;
  }
};
