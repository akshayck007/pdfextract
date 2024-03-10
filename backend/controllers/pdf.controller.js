import fileUpload from "express-fileupload";

export const upload = (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ error: "Bad Request, Recieved no PDF Files" });
    }

    const recievedFile = req.files.pdf;
    const uniqueName = Date.now() + recievedFile.name;
    const uploadPath = __dirname + "uploads";

    recievedFile.mv(uploadPath, (err) => {
      if (err) {
        res
          .status(400)
          .json({ error: err.message, hint: "add fileUplaod middleware" });
      }

      res
        .status(201)
        .json({ message: "file uploaded successfully", fileName: uniqueName });
    });
  } catch (error) {
    console.log("Couldnt upload", error.message);
    res.status(400).json({ error: "internal server error" });
  }
};
