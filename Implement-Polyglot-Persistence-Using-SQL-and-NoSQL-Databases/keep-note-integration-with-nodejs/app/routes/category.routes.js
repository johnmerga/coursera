module.exports = (app) => {
  const category = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Create a new Category
  router.post("/", (req, res) => {
    try {
      const newCategory = {
        category_name: req.body.category_name || "",
        category_description: req.body.category_description || "",
        category_creator_id: req.body.category_creator_id || "",
      };

      category.create(newCategory, (err, results) => {
        if (err) {
          // EXITING
          return res.status(400).send({
            STATUS: "error",
            message: err,
          });
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log("Unexpected error in saving category..!", error);

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in saving category, please try later..!",
      });
    }
  });

  // Retrieve all category
  router.get("/", (req, res) => {
    try {
      const name = req.query.category_name;

      category.findAll({ category_name: name }, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            // EXITING
            return res.status(404).send({ STATUS: "Not found", data: [] });
          }
          // EXITING
          return res.status(400).send(err);
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log("Unexpected error in fetching categories..!", error);

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in fetching categories, please try later..!",
      });
    }
  });

  // Retrieve a single Category with id
  router.get("/:id", (req, res) => {
    try {
      let id = req.params.id;
      category.findOne(id, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            // EXITING
            return res.status(404).send({ STATUS: "Not found", data: [] });
          }
          // EXITING
          return res.status(400).send(err);
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log(
        "Unexpected error in getting category details by id..!",
        error
      );

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in getting category details by id, please try later..!",
      });
    }
  });

  // Update a Category with id
  router.put("/:id", (req, res) => {
    try {
      let id = req.params.id;
      const requiredFields = ["category_name", "category_description"];
      const inputFields = Object.keys(req.body);
      if (!inputFields.every((field) => requiredFields.includes(field))) {
        // EXITING
        return res.status(400).send({
          STATUS: "error",
          message: "Please provide all required fields",
        });
      }
      let upCategory = {};
      for (let i = 0; i < inputFields.length; i++) {
        upCategory[inputFields[i]] = req.body[inputFields[i]];
      }
      console.log("upCategory", upCategory);

      category.update(id, upCategory, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            // EXITING
            return res.status(404).send({ STATUS: "Not found", data: [] });
          }
          // EXITING
          return res.status(400).send(err);
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log(
        "Unexpected error in updating Category details by categoryId..!",
        error
      );

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in updating category details by categoryId, please try later..!",
      });
    }
  });

  // Delete a Category with id
  router.delete("/:id", (req, res) => {
    try {
      let id = req.params.id;
      category.delete(id, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            // EXITING
            return res.status(404).send({ STATUS: "Not found", data: [] });
          }
          // EXITING
          return res.status(400).send(err);
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log(
        "Unexpected error in deleting category details by id..!",
        error
      );

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in deleting category details by id, please try later..!",
      });
    }
  });

  // Delete all category
  router.delete("/", (req, res) => {
    try {
      category.deleteAll((err, results) => {
        if (err) {
          // EXITING
          return res.status(400).send(err);
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log("Unexpected error in deleting all categories..!", error);

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in deleting all category details, please try later..!",
      });
    }
  });
  app.use("/api/category", router);
};

