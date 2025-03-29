// index.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getPostTemplate } from './templates';
import { formatLinkedInPost, generateHashtags } from './formatters';
import { generateAIPost } from './ai-generator';
import { PostOutput, WorkersAI, Env, PostTone, PostType } from './types';

// Define request validation schema - match with your existing types
const postParamsSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  tone: z.string().optional().default('professional'),
  includeHashtags: z.boolean().optional().default(true),
  postType: z.string().optional().default('thought_leadership')
});

// Create Hono app
const app = new Hono<{ Bindings: Env }>();

// Set up routes
app
  .post('/generate', zValidator('json', postParamsSchema), async (c) => {
    const params = c.req.valid('json');
    const aiBinding = c.env.AI;
    
    let postContent: string;
    let generationMethod: 'ai' | 'template' = 'template';
    
    // Type assertion to match your existing types
    const tone = params.tone as PostTone;
    const postType = params.postType as PostType;
    
    try {
      // Use AI if available, otherwise fallback to templates
      if (aiBinding) {
        postContent = await generateAIPost(aiBinding, params.topic, tone, postType);
        generationMethod = 'ai';
      } else {
        postContent = getPostTemplate(params.topic, postType, tone);
      }
    } catch (error) {
      // Fallback to templates if AI generation fails
      console.error('AI generation failed:', error);
      postContent = getPostTemplate(params.topic, postType, tone);
    }
    
    // Add hashtags if requested
    const contentWithHashtags = params.includeHashtags ? 
      `${postContent}\n\n${generateHashtags(params.topic, postType)}` : 
      postContent;
    
    // Format for LinkedIn
    const formattedPost = formatLinkedInPost(contentWithHashtags, params.topic);
    
    const result: PostOutput = {
      content: formattedPost,
      metadata: {
        type: 'linkedin_post',
        topic: params.topic,
        tone: tone,
        postType: postType,
        generationMethod,
        characterCount: formattedPost.length,
        recommendedPostTime: 'Tuesday or Thursday between 10-11am',
        generatedAt: new Date().toISOString()
      }
    };
    
    return c.json(result);
  })
  .get('/', (c) => c.text('LinkedIn Post Generator API - Use POST /generate endpoint'));

// Export for Cloudflare Workers
export default app;