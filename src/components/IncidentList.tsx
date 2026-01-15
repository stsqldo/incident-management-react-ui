import { Incident } from "../models/Incident";

export function IncidentList({ incidents, onStatusChange }: any) {
  return (
    <ul>
      {incidents.map((i: Incident) => (
        <li key={i.id}>
          <strong>{i.title}</strong> - {i.severity} - {i.status}
          <select onChange={e => onStatusChange(i.id, e.target.value)}>
            <option value="Open">Open</option>
            <option value="InProgress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <ul>
            {i.attachments.map(a => (
              <li key={a.blobUrl}>
                <a href={a.blobUrl} target="_blank">{a.fileName}</a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}