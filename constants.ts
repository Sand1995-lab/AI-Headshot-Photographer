
import type { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    prompt: 'A professional corporate headshot of the subject against a solid, light grey backdrop. The lighting should be soft and even, creating a clean and professional look. The subject should be wearing professional business attire.',
    thumbnailUrl: 'https://picsum.photos/id/201/200/200',
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    prompt: 'Generate a professional headshot with the subject in a modern tech office environment. The background should be slightly blurred (bokeh effect) and feature elements like glass walls, collaborative spaces, or subtle branding. Lighting should be bright and modern.',
    thumbnailUrl: 'https://picsum.photos/id/1078/200/200',
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    prompt: 'A professional headshot of the subject outdoors with natural lighting. The background should be a pleasant, out-of-focus natural scene like a park or modern architecture. The lighting should be warm, as if taken during the "golden hour".',
    thumbnailUrl: 'https://picsum.photos/id/367/200/200',
  },
  {
    id: 'studio-dramatic',
    name: 'Studio Dramatic',
    prompt: 'Create a dramatic, studio-lit headshot against a dark, textured backdrop (like charcoal or navy blue). Use strong key and fill lights to create depth and contrast, highlighting the subject\'s features for a powerful, confident look.',
    thumbnailUrl: 'https://picsum.photos/id/1005/200/200',
  },
   {
    id: 'black-and-white',
    name: 'Classic B&W',
    prompt: 'Convert the image into a classic, high-contrast black and white headshot. The lighting should be sharp and cinematic, emphasizing texture and form. The background should be a simple, dark, neutral tone.',
    thumbnailUrl: 'https://picsum.photos/id/1011/200/200?grayscale',
  },
   {
    id: 'warm-and-approachable',
    name: 'Warm & Friendly',
    prompt: 'Generate a warm and approachable headshot. The subject should be in a casual but smart outfit, against a warm-toned, slightly blurred indoor background like a cozy cafe or creative studio. The lighting should be soft and inviting.',
    thumbnailUrl: 'https://picsum.photos/id/163/200/200',
  }
];
