// Prompt refinement logic for meal image generation in elder care settings

const POLICY = `You are a prompt refinement specialist creating realistic photos of meals for elderly residents in elder care facilities. Generate photorealistic images with natural, warm lighting showing moderate portion sizes on plates, in bowls, or on trays as appropriate for the food type. The food should be easy-to-chew with natural colors that look fresh and appetizing. Use clean, minimal backgrounds that keep focus on the meal while suggesting an elder care setting. Show nutritionally appropriate meals that meet common elderly dietary restrictions and facility standards. Photograph one main dish from a slightly elevated angle, adding simple sides or beverages only when they enhance the presentation. Be ready to adapt for different cuisines and dietary needs (low-sodium, diabetic-friendly, pureed textures) while maintaining realistic, facility-appropriate presentation. Avoid artistic filters or stylization, and adjust specific elements when modifications are requested while preserving overall quality standards.`;

export type RefinementOptions = {
  cuisineHint?: string;
  dietaryNeeds?: string[]; // e.g., ["low-sodium", "diabetic-friendly"]
};

/**
 * Refine a raw user description into a concise, image-generation-ready prompt.
 */
export function refinePrompt(userText: string, options: RefinementOptions = {}): string {
  const trimmed = (userText || '').trim();
  const cuisine = options.cuisineHint?.trim();
  const dietary = (options.dietaryNeeds || []).filter(Boolean).join(', ');

  const constraints: string[] = [];
  if (cuisine) constraints.push(`Cuisine: ${cuisine}`);
  if (dietary) constraints.push(`Dietary considerations: ${dietary}`);

  const guidance = [
    POLICY,
    'Create a single, photorealistic still image (no text overlays).',
    'Slightly elevated camera angle; warm, natural lighting; clean minimal background suggesting an elder care setting.',
    'Moderate portion size; easy-to-chew textures; fresh, natural colors; avoid stylized filters.',
  ];

  const details = [
    `User description: ${trimmed || 'simple nutritious meal appropriate for elders'}.`,
    ...constraints,
  ].filter(Boolean);

  return [guidance.join(' '), details.join(' ')].join('\n');
}


