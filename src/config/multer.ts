const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (
    req: any,
    file: { mimetype: string },
    cb: (arg0: Error | null, arg1: boolean) => void
  ) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false);
      return;
    }

    cb(null, true);
  },
});
