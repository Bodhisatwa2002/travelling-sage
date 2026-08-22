import { supabase } from "./client";
import type { Destination, Region } from "@/types";

export async function getAllRegions(): Promise<Region[]> {
  const { data } = await supabase
    .from("regions")
    .select("slug, name")
    .order("name");

  return data ?? [];
}

export async function getAllDestinations(): Promise<Destination[]> {
  const { data } = await supabase
    .from("destinations")
    .select("slug, name, description, image, regions(slug)")
    .order("name");

  return (data ?? []).map((d) => ({
    slug: d.slug,
    name: d.name,
    description: d.description,
    image: d.image,
    region: (d.regions as unknown as { slug: string })?.slug ?? "",
  }));
}

export async function getDestinationsByRegion(regionSlug: string): Promise<Destination[]> {
  const { data } = await supabase
    .from("destinations")
    .select("slug, name, description, image, regions!inner(slug)")
    .eq("regions.slug", regionSlug)
    .order("name");

  return (data ?? []).map((d) => ({
    slug: d.slug,
    name: d.name,
    description: d.description,
    image: d.image,
    region: (d.regions as unknown as { slug: string })?.slug ?? "",
  }));
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const { data } = await supabase
    .from("destinations")
    .select("slug, name, description, image, regions(slug)")
    .eq("slug", slug)
    .limit(1)
    .single();

  if (!data) return null;

  return {
    slug: data.slug,
    name: data.name,
    description: data.description,
    image: data.image,
    region: (data.regions as unknown as { slug: string })?.slug ?? "",
  };
}

export async function getRegionBySlug(slug: string): Promise<Region | null> {
  const { data } = await supabase
    .from("regions")
    .select("slug, name")
    .eq("slug", slug)
    .limit(1)
    .single();

  return data;
}
