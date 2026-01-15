import { useEffect, useState } from "react";
import { Incident } from "../models/Incident";
import { getIncidents, createIncident, updateStatus, uploadAttachment } from "../services/incidentService";
import { IncidentList } from "../components/IncidentList";
import { CreateIncidentForm } from "../components/CreateIncidentForm";

export function IncidentPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState("All");

  const load = async () => {
    setIncidents(await getIncidents());
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = filter === "All"
    ? incidents
    : incidents.filter(i => i.status === filter || i.severity === filter);

  return (
    <div>
      <h2>Incident Management</h2>

      <label>Filter:</label>
      <select onChange={e => setFilter(e.target.value)}>
        <option>All</option>
        <option>Open</option>
        <option>InProgress</option>
        <option>Resolved</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <CreateIncidentForm onCreate={async (data: any) => {
        const form = new FormData();
        form.append("title", data.title);
        form.append("description", data.description);
        form.append("severity", data.severity);
        await createIncident(form);

        if (data.file) {
          const latest = (await getIncidents()).slice(-1)[0];
          await uploadAttachment(latest.id, data.file);
        }

        load();
      }} />

      <IncidentList
        incidents={filtered}
        onStatusChange={async (id: number, status: string) => {
          await updateStatus(id, status);
          load();
        }}
      />
    </div>
  );
}