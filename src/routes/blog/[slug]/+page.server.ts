import type { PageServerLoad } from './$types';
import { getPost } from '$lib/server/blog/index';
import { error } from '@sveltejs/kit';

export const load = (async ({params}) => {
	const post = await getPost(params.slug);

	if (!post) {
		throw error(404);
	}

	return {
		post
	};
}) satisfies PageServerLoad;
