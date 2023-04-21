import License from "../models/License.js";
import { createError } from "../utils/error.js";

export const createLicense = async (req, res, next) => {
  try {
    const newLicense = new License(req.body);
    await newLicense.save();
    res.status(200).json(newLicense);
  } catch (err) {
    next(err);
  }
};

export const updateLicense = async (req, res, next) => {
  try {
    const updatedLicense = await License.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedLicense) return next(createError(404, "Ruhsat bulunamadı!"));
    res.status(200).json(updatedLicense);
  } catch (err) {
    next(err);
  }
};

export const deleteLicense = async (req, res, next) => {
  try {
    await License.findByIdAndDelete(req.params.id);
    res.status(200).json("Ruhsat silindi.");
  } catch (err) {
    next(err);
  }
};

export const getLicense = async (req, res, next) => {
  try {
    const getLicense = await License.findById(req.params.id);
    if (!getLicense) return next(createError(404, "Ruhsat bulunamadı!"));
    res.status(200).json(getLicense);
  } catch (err) {
    next(err);
  }
};

export const getAllLicenses = async (req, res, next) => {
  try {
    const getAllLicenses = await License.find();
    if (!getAllLicenses) return next(createError(404, "Ruhsat bulunamadı!"));

    const licenses = getAllLicenses.map((license) => {
      const expireDate = new Date(license.createdAt);
      expireDate.setDate(expireDate.getDate() + 7);
      return {
        ...license._doc,
        createdAt: new Date(license.createdAt).toLocaleString("tr-TR", {
          hour: "numeric",
          minute: "numeric",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        expireDate: expireDate.toLocaleString("tr-TR", {
          hour: "numeric",
          minute: "numeric",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
    });

    res.status(200).json(licenses);
  } catch (err) {
    next(err);
  }
};
