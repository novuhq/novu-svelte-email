import { echo } from '$lib/echo';
import { serve } from '@novu/echo/sveltekit';

export const { GET, POST, PUT } = serve({ client: echo });
