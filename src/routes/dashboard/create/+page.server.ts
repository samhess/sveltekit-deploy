import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { marked } from 'marked'

import * as posts from '$lib/services/posts'
import { postSchema } from '$lib/zod/schema'

export const load = async (event) => {
	const form = await superValidate(event, zod(postSchema))
	return { form }
}

export const actions = {
	default: async (event) => {
		//const d = await event.request.formData()
		const form = await superValidate(event, zod(postSchema))
		console.log(form)

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const data = {
				...form.data,
				html: marked.parse(form.data.markdown),
			}
			await posts.createPost(data)
		} catch (error) {
			return fail(400, { form })
		}

		redirect(300, '/dashboard');
	},
}
