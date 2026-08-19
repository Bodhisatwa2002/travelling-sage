import { client, ISR } from "../config/client";
import type { Destination, Region } from "@/types";

const regionFields = `
  "slug": slug.current,
  name
`;

const destinationFields = `
  "slug": slug.current,
  name,
  description,
  image,
  "region": region->slug.current
`;

export async function getAllRegions(): Promise<Region[]> {
  return client.fetch<Region[]>(
    `*[_type == "region"] | order(name asc) { ${regionFields} }`,
    {},
    ISR,
  );
}

export async function getAllDestinations(): Promise<Destination[]> {
  return client.fetch<Destination[]>(
    `*[_type == "destination"] | order(name asc) { ${destinationFields} }`,
    {},
    ISR,
  );
}

export async function getDestinationsByRegion(regionSlug: string): Promise<Destination[]> {
  return client.fetch<Destination[]>(
    `*[_type == "destination" && region->slug.current == $regionSlug] | order(name asc) { ${destinationFields} }`,
    { regionSlug },
    ISR,
  );
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  return client.fetch<Destination | null>(
    `*[_type == "destination" && slug.current == $slug][0] { ${destinationFields} }`,
    { slug },
    ISR,
  );
}

export async function getRegionBySlug(slug: string): Promise<Region | null> {
  return client.fetch<Region | null>(
    `*[_type == "region" && slug.current == $slug][0] { ${regionFields} }`,
    { slug },
    ISR,
  );
}
