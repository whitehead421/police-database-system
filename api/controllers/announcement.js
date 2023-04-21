import Announcement from "../models/Announcement.js";
import { createError } from "../utils/error.js";

export const createAnnouncement = async (req, res, next) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.status(200).send("Duyuru olusturuldu.");
  } catch (err) {
    next(err);
  }
};

export const updateAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return next(createError(404, "Duyuru bulunamadı!"));

    await Announcement.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).send("Duyuru guncellendi.");
  } catch (err) {
    next(err);
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return next(createError(404, "Duyuru bulunamadı!"));

    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).send("Duyuru silindi.");
  } catch (err) {
    next(err);
  }
};

export const getAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return next(createError(404, "Duyuru bulunamadı!"));

    res.status(200).json(duyuru);
  } catch (err) {
    next(err);
  }
};

export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcement = await Announcement.find();
    if (!announcement) return next(createError(404, "Duyuru bulunamadı!"));
    const announcements = announcement.map((announcement) => {
      return {
        ...announcement._doc,
        createdAt: new Date(announcement.createdAt).toLocaleString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    });
    res.status(200).json(announcements);
  } catch (err) {
    next(err);
  }
};

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const getAnnouncementCount = async (req, res, next) => {
  try {
    const count = await Announcement.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};
