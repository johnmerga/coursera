module.exports = (app) => {
  const note = require("../controllers/note.controller.js");

  var router = require("express").Router();

  // Create a new Note
  router.post("/", (req, res) => {
    try {
      const newNote = {
        note_title: req.body.note_title || "",
        note_content: req.body.note_content || "",
        note_status: req.body.note_status || "",
        user_id: req.body.user_id || "",
        // note_creation_date: req.body.note_creation_date || '',
        // category_id: req.body.category_id,
        // reminder_id: req.body.reminder_id,
      };

      note.create(newNote, (err, results) => {
        if (err) {
          // EXITING
          return res.status(400).send({
            STATUS: "error",
            message: err,
          });
        }

        // EXITING
        return res.status(201).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log("Unexpected error in saving note..!", error);

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in saving note, please try later..!",
      });
    }
  });

  // Retrieve all Note
  router.get("/", (req, res) => {
    try {
      const title = req.query.title;
      note.getAll({ title }, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            // EXITING
            return res.status(404).send({
              STATUS: "NOT_FOUND",
              message: `No note found with title ${title}.`,
            });
          }
          return res.status(400).send({
            STATUS: "error",
            message: err,
          });
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log("Unexpected error in fetching notes..!", error);

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in fetching notes, please try later..!",
      });
    }
  });

  // Retrieve a single Note with id
  router.get("/:id", (req, res) => {
    try {
      let id = req.params.id;

      note.findById(id, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            // EXITING
            return res.status(404).send({
              STATUS: "NOT_FOUND",
              message: `No note found with id ${id}.`,
            });
          }
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
      console.log("Unexpected error in getting note details by id..!", error);

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in getting note details by id, please try later..!",
      });
    }
  });

  // Update a Note with id
  router.put("/:id", (req, res) => {
    try {
      let id = req.params.id;
      const requiredFields = ["note_title", "note_content", "note_status"];
      const inputFields = Object.keys(req.body);
      if (!inputFields.every((field) => requiredFields.includes(field))) {
        // EXITING
        return res.status(400).send({
          STATUS: "error",
          message: "Please provide required fields",
        });
      }
      let upNote = {};
      for (let i = 0; i < inputFields.length; i++) {
        upNote[inputFields[i]] = req.body[inputFields[i]];
      }

      note.update(id, upNote, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            // EXITING
            return res.status(404).send({
              STATUS: "NOT_FOUND",
              message: `No note found with id ${id}.`,
            });
          }
          // EXITING
          return res.status(400).send(err);
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log(
        "Unexpected error in updating Note details by noteId..!",
        error
      );

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in updating note details by noteId, please try later..!",
      });
    }
  });

  // Delete a Note with id
  router.delete("/:id", (req, res) => {
    try {
      let id = req.params.id;

      note.delete(id, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            // EXITING
            return res.status(404).send({
              STATUS: "NOT_FOUND",
              message: `No note found with id ${id}.`,
            });
          }
          // EXITING
          return res.status(400).send(err);
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log("Unexpected error in deleting note details by id..!", error);

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in deleting note details by id, please try later..!",
      });
    }
  });

  // Delete all Notes
  router.delete("/", (req, res) => {
    try {
      note.deleteAll((err, results) => {
        if (err) {
          // EXITING
          return res.status(400).send(err);
        }

        // EXITING
        return res.status(200).send({ STATUS: "OK", data: results });
      });
    } catch (error) {
      console.log("Unexpected error in deleting all note..!", error);

      // EXITING
      return res.status(400).send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in deleting all note details, please try later..!",
      });
    }
  });

  app.use("/api/note", router);
};
