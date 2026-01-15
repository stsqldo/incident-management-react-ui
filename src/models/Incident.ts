export interface Attachment {
  fileName: string;
  blobUrl: string;
}

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  attachments: Attachment[];
}