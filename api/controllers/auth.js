import Officer from "../models/Officer.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newOfficer = new Officer({
      ...req.body,
      password: hash,
    });

    await newOfficer.save();
    res.status(200).send("Kullanıcı olusturuldu.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const officer = await Officer.findOne({ username: req.body.username });
    if (!officer) return next(createError(404, "Memur bulunamadı!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      officer.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Hatalı kullanıcı adı ya da şifre!"));

    const token = jwt.sign(
      { id: officer._id, rankNo: officer.rankNo },
      process.env.JWT,
      {
        expiresIn: "2h",
      }
    );

    const { password, ...otherDetails } = officer._doc;
    res
      .cookie("access_token", token)
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ msg: "Çıkış yapıldı." });
  } catch (err) {
    next(err);
  }
};
