import { useState } from "react";

export function CreateIncidentForm({ onCreate }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [file, setFile] = useState<File | null>(null);

  const submit = () => {
    onCreate({ title, description, severity, file });
  };

  return (
    <div>
      <h3>Create Incident</h3>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <select onChange={e => setSeverity(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={submit}>Create</button>
    </div>
  );
}