import { sanityFetch } from "../lib/fetch";
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

export const allRegionsQuery = `*[_type == "region"] | order(name asc) { ${regionFields} }`;

export const allDestinationsQuery = `*[_type == "destination"] | order(name asc) { ${destinationFields} }`;

export const destinationsByRegionQuery = `*[_type == "destination" && region->slug.current == $regionSlug] | order(name asc) { ${destinationFields} }`;

export const destinationBySlugQuery = `*[_type == "destination" && slug.current == $slug][0] { ${destinationFields} }`;

export const regionBySlugQuery = `*[_type == "region" && slug.current == $slug][0] { ${regionFields} }`;

export async function getAllRegions(): Promise<Region[]> {
  return sanityFetch<Region[]>(allRegionsQuery);
}

export async function getAllDestinations(): Promise<Destination[]> {
  return sanityFetch<Destination[]>(allDestinationsQuery);
}

export async function getDestinationsByRegion(
  regionSlug: string,
): Promise<Destination[]> {
  return sanityFetch<Destination[]>(destinationsByRegionQuery, { regionSlug });
}

export async function getDestinationBySlug(
  slug: string,
): Promise<Destination | null> {
  return sanityFetch<Destination | null>(destinationBySlugQuery, { slug });
}

export async function getRegionBySlug(
  slug: string,
): Promise<Region | null> {
  return sanityFetch<Region | null>(regionBySlugQuery, { slug });
}
