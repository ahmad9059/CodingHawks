// src/ai/flows/generate-announcement-summary.ts
'use server';

/**
 * @fileOverview Generates a concise summary for an announcement using Genkit.
 *
 * Exports:
 * - `generateAnnouncementSummary`: Asynchronously generates an announcement summary.
 * - `AnnouncementSummaryInput`: Type definition for the input to the summary generation.
 * - `AnnouncementSummaryOutput`: Type definition for the output of the summary generation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnnouncementSummaryInputSchema = z.object({
  title: z.string().describe('The title of the announcement.'),
  description: z.string().describe('The full description of the announcement.'),
});
export type AnnouncementSummaryInput = z.infer<typeof AnnouncementSummaryInputSchema>;

const AnnouncementSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the announcement.'),
});
export type AnnouncementSummaryOutput = z.infer<typeof AnnouncementSummaryOutputSchema>;

export async function generateAnnouncementSummary(input: AnnouncementSummaryInput): Promise<AnnouncementSummaryOutput> {
  return generateAnnouncementSummaryFlow(input);
}

const announcementSummaryPrompt = ai.definePrompt({
  name: 'announcementSummaryPrompt',
  input: {schema: AnnouncementSummaryInputSchema},
  output: {schema: AnnouncementSummaryOutputSchema},
  prompt: `Summarize the following announcement to be concise and engaging:\n\nTitle: {{{title}}}\nDescription: {{{description}}}`,
});

const generateAnnouncementSummaryFlow = ai.defineFlow(
  {
    name: 'generateAnnouncementSummaryFlow',
    inputSchema: AnnouncementSummaryInputSchema,
    outputSchema: AnnouncementSummaryOutputSchema,
  },
  async input => {
    const {output} = await announcementSummaryPrompt(input);
    return output!;
  }
);
