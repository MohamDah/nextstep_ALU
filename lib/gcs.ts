// src/lib/gcs.ts
import { Storage } from '@google-cloud/storage';

export const getBucket = () => {
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCS_CLIENT_EMAIL,
      private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'), 
    },
  });
  
  return storage.bucket(process.env.GCS_BUCKET_NAME as string);
}

