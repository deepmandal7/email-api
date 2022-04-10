const Logger = require("../utilities/logger"),
  { ObjectId } = require("mongoose").Types,
  { Email } = require("../models");

module.exports.deleteEmail = async (data) => {
  try {
    return await Email.deleteOne(data).then((result) => {
      return result.deletedCount;
    });
  } catch (err) {
    Logger.error(err);
    return;
  }
};

module.exports.updateEmail = async (data) => {
  try {
    return await Email.updateOne({ _id: ObjectId(data._id), email_status: "Scheduled" }, data).then((result) => {
      return result.modifiedCount;
    });
  } catch (err) {
    Logger.error(err);
    return;
  }
};

module.exports.getEmail = async (filters) => {
  try {
    if (filters._id) {
      return await Email.findById(ObjectId(filters._id)).then((result) => {
        return result;
      });
    }
    if (filters.failed) {
      return await Email.find({ email_status: "Failed" }).then((result) => {
        return result;
      });
    }
    return await Email.find().then((result) => {
      return result;
    });
  } catch (err) {
    Logger.error(err);
    return;
  }
};

module.exports.createEmail = async (data) => {
  try {
    return await Email.create(data).then((result) => {
      return 1;
    });
  } catch (err) {
    Logger.error(err);
    return;
  }
};
