import { Echo } from '@novu/echo';
import { render } from 'svelte-email';
import AirbnbReview from '$lib/emails/airbnb-review.svelte';

export const echo = new Echo({

  apiKey: process.env.NOVU_API_KEY,
  /**
   * Enable this flag only during local development
   * For production this should be false
   */
  devModeBypassAuthentication: true
});

echo.workflow('airbnb-review', async ({ step, payload }) => {
    await step.email(
        'send-email',
        async (inputs) => {
            const html = render({
                template: AirbnbReview,
                props: {
                    authorName: inputs.authorName,
                    showFeedbackButton: inputs.showFeedbackButton,
                    showLogoImage: inputs.showLogoImage,
                    feedbackButtonText: inputs.feedbackButtonText,
                    bottomAddress: inputs.bottomAddress,
                    authorImage: inputs.authorImage,
                    logoImage: inputs.logoImage
                },
            });
            return {
                subject: `Here's Your Host Feedback`,
                body: html,
            }
        }, {
            inputSchema: {
                type: "object",
                properties: {
                  showFeedbackButton: { type: "boolean", default: true },
                  showLogoImage: { type: "boolean", default: true },
                  authorName: { type: "string", default: "Alex" },
                  feedbackButtonText: { type: "string", default: "Send My Feedback" },
                  authorImage: {
                    type: "string",
                    default: "https://react-email-demo-bdj5iju9r-resend.vercel.app/static/vercel-user.png",
                    format: "uri",
                  },
                  logoImage: {
                    type: "string",
                    default: "https://svelte-email-rjaapma15-konzeptfabrik.vercel.app/airbnb-logo.png",
                    format: "uri",
                  },
                  bottomAddress: {
                    type: "string",
                    default: "Airbnb, Inc., 888 Brannan St, San Francisco, CA 94103",
                  },
                },
            },
        });
    }
);
