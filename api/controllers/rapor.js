import Rapor from "../models/Rapor.js";
import { createError } from "../utils/error.js";

export const createRapor = async (req, res, next) => {
  try {
    const newRapor = new Rapor(req.body);
    await newRapor.save();
    res.status(200).json(newRapor);
  } catch (err) {
    next(err);
  }
};

export const updateRapor = async (req, res, next) => {
  try {
    const updatedRapor = await Rapor.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedRapor) return next(createError(404, "Rapor bulunamadı!"));
    res.status(200).json(updatedRapor);
  } catch (err) {
    next(err);
  }
};

export const deleteRapor = async (req, res, next) => {
  try {
    await Rapor.findByIdAndDelete(req.params.id);
    res.status(200).json("Rapor silindi.");
  } catch (err) {
    next(err);
  }
};

export const getRapor = async (req, res, next) => {
  try {
    const getRapor = await Rapor.findById(req.params.id);
    if (!getRapor) return next(createError(404, "Rapor bulunamadı!"));
    res.status(200).json(getRapor);
  } catch (err) {
    next(err);
  }
};

export const getAllRapors = async (req, res, next) => {
  try {
    const getAllRapors = await Rapor.find();
    const reports = getAllRapors.map((report) => {
      return {
        ...report._doc,
        createdAt: new Date(report.createdAt).toLocaleString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    });
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

export const getRaporByType = async (req, res, next) => {
  try {
    const getRaporByType = await Rapor.find({ type: req.params.type });
    const reports = getRaporByType.map((report) => {
      return {
        ...report._doc,
        createdAt: new Date(report.createdAt).toLocaleString("tr-TR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
      };
    });
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};
