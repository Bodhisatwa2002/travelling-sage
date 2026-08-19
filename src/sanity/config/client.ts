import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

export const ISR = { next: { revalidate: 3600 } } as const;
