const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const examplesControllers = require("../../controllers/mongodb/ExamplesControllers");

router.post(
  "/register",
  [
    body("namaLengkap").isLength({ min: 2 }).withMessage("nama lengkap tidak boleh kosong"),
    body("username").isLength({ min: 2 }).withMessage("username tidak boleh kosong"),
    body("password").isLength({ min: 2 }).withMessage("password tidak boleh kosong"),
    body("jenisKelamin").isLength({ min: 2 }).withMessage("jenis kelamin tidak boleh kosong"),
    body("noHp").isLength({ min: 10 }).withMessage("no hp minimal 10 karakter"),
    body("alamat").isLength({ min: 2 }).withMessage("alamat tidak boleh kosong"),
    body("kabupaten").isLength({ min: 2 }).withMessage("kabupaten tidak boleh kosong"),
    body("kecamatan").isLength({ min: 2 }).withMessage("kecamatan tidak boleh kosong"),
    body("kategori").isLength({ min: 2 }).withMessage("kategori tidak boleh kosong"),
  ],
  examplesControllers.register
);

router.post("/login", [body("username").isLength({ min: 2 }).withMessage("username tidak boleh kosong"), body("password").isLength({ min: 2 }).withMessage("password tidak boleh kosong")], examplesControllers.login);

router.post("/checkUsername", [body("username").isLength({ min: 2 }).withMessage("username tidak boleh kosong")], examplesControllers.checkUsername);

router.post(
  "/recoveryPassword/:username",
  [
    // body('passwordLama').isLength({min: 2}).withMessage('Password lama tidak boleh kosong'),
    body("passwordBaru").isLength({ min: 2 }).withMessage("Password baru tidak boleh kosong"),
  ],
  examplesControllers.recoveryPassword
);

router.put("/logout", examplesControllers.logOut);

module.exports = router;
