import imageUrlBuilder from "@sanity/image-url";
import { client } from "../config/client";

const builder = imageUrlBuilder(client);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}
