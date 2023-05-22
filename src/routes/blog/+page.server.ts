import type { PageServerLoad } from "./$types";
import { getBlogIndex } from "$lib/server/blog/index";

export const load = (async () => {
  return {
    posts: await getBlogIndex(),
  };
}) satisfies PageServerLoad;
