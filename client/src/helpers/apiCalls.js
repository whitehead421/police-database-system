import { publicRequest } from "./requestMethods";
import alertify from "alertifyjs";

export const addAnnouncement = async (data) => {
  try {
    await publicRequest.post(`/api/announcements/`, data);
    alertify.success("Duyuru başarıyla eklendi.");
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    await publicRequest.delete(`/api/announcements/${id}`);
    alertify.success("Duyuru silindi.");
  } catch (err) {
    console.log(err);
    alertify.error("Duyuru silinemedi. Sistem yetkilisine ulaşın.");
  }
};

export const deleteOfficer = async (id) => {
  try {
    await publicRequest.delete(`/api/officers/${id}`);
    alertify.success("Memur görevden alındı.");
  } catch (err) {
    alertify.error("Memur tenzil edilemedi!");
  }
};

export const updateOfficer = async (id, data) => {
  try {
    await publicRequest.put(`/api/officers/${id}`, data);
    alertify.success("Memur güncellendi.");
  } catch (err) {
    alertify.error("Memur güncellenemedi!");
  }
};

export const addOfficer = async (data) => {
  try {
    await publicRequest.post(`/api/auth/register`, data);
    alertify.success("Memur başarıyla eklendi.");
  } catch (err) {
    alertify.error("Memur eklenemedi!");
  }
};

export const createLicense = async (data) => {
  try {
    await publicRequest.post(`/api/licenses/`, data);
    alertify.success("Lisans başarıyla oluşturuldu.");
  } catch (err) {
    alertify.error("Lisans oluşturulamadı!");
  }
};

export const deleteLicense = async (id) => {
  try {
    await publicRequest.delete(`/api/licenses/${id}`);
    alertify.success("Lisans silindi. Sistemi yenileyin.");
  } catch (err) {
    alertify.error("Lisans silinemedi!");
  }
};

export const updateLicense = async (id, data) => {
  try {
    await publicRequest.put(`/api/licenses/${id}`, data);
    alertify.success("Lisans güncellendi. Sistemi yenileyin.");
  } catch (err) {
    alertify.error("Lisans güncellenemedi!");
  }
};

export const createReport = async (data) => {
  try {
    await publicRequest.post(`/api/reports/`, data);
    alertify.success("Rapor başarıyla oluşturuldu.");
  } catch (err) {
    alertify.error("Rapor oluşturulamadı!");
  }
};

export const addWantedRecord = async (data) => {
  try {
    await publicRequest.post(`/api/wanteds/`, data);
    alertify.success("Aranma kaydı başarıyla eklendi.");
  } catch (err) {
    alertify.error("Aranma kaydı eklenemedi!");
  }
};

export const deleteWantedRecord = async (id) => {
  try {
    await publicRequest.delete(`/api/wanteds/${id}`);
    alertify.success("Aranma kaydı silindi.");
  } catch (err) {
    alertify.error("Aranma kaydı silinemedi!");
  }
};

export const createMessage = async (data) => {
  try {
    await publicRequest.post(`/api/messages/`, data).then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteMessage = async (id) => {
  try {
    await publicRequest.delete(`/api/messages/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const getAllMessages = async () => {
  try {
    const res = await publicRequest.get(`/api/messages/`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteReport = async (id) => {
  try {
    await publicRequest.delete(`/api/reports/${id}`);
    alertify.success("Rapor silindi.");
  } catch (err) {
    alertify.error("Rapor silinemedi!");
  }
};
