const catchAsync = require("../utilities/catchAsync"),
  { deleteEmail, updateEmail, getEmail, createEmail } = require("../services");

module.exports.emailController = catchAsync(async (req, res, next) => {
  if (req.method == "DELETE") {
    let params = { ...req.params };
    let response = await deleteEmail(params);
    if (response === 1) {
      res.message = "Mail deleted successfully";
      return next(200);
    }
    res.error = "Failed to delete email";
    return next(500);
  }
  if (req.method == "PUT") {
    let data = { ...req.body, ...req.params };
    let response = await updateEmail(data);
    if (response === 1) {
      res.message = "Mail updated successfully";
      return next(200);
    }
    res.error = "Failed to update email";
    return next(500);
  }
  if (req.method == "POST") {
    let data = { ...req.body };
    let response = await createEmail(data);
    if (response === 1) {
      res.message = "Mail created successfully";
      return next(200);
    }
    res.error = "Failed to create email";
    return next(500);
  }
  if (req.method == "GET" && req.originalUrl.includes("failed")) {
    let query = { ...req.query };
    query.failed = true;
    let response = await getEmail(query);
    if (response) {
      res.message = response;
      return next(200);
    }
    res.error = "Failed to get email(s)";
    return next(500);
  }
  if (req.method == "GET") {
    let query = { ...req.query };
    let response = await getEmail(query);
    if (response) {
      res.message = response;
      return next(200);
    }
    res.error = "Failed to get email(s)";
    return next(500);
  }
});
