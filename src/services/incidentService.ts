import { api } from "./api";
import { Incident } from "../models/Incident";

export const getIncidents = async (): Promise<Incident[]> => {
  const res = await api.get("/incidents");
  return res.data;
};

export const createIncident = async (data: FormData) => {
  await api.post("/incidents", data);
};

export const updateStatus = async (id: number, status: string) => {
  await api.put(`/incidents/${id}/status`, { status });
};

export const uploadAttachment = async (id: number, file: File) => {
  const form = new FormData();
  form.append("file", file);
  await api.post(`/incidents/${id}/attachments`, form);
};