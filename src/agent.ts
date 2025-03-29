// Agent configuration module
import { Agent } from 'agents';
import { getPostTemplate } from './prompt';
import { formatLinkedInPost, generateHashtags } from './formatters';
import { generateAIPost } from './ai-generator';
import { PostParameters, PostOutput, WorkersAI } from './types';

export function createLinkedInAgent(aiBinding?: WorkersAI) {
  return new Agent({
    name: 'LinkedInContentAgent',
    description: 'An agent specialized in creating professional LinkedIn posts using AI',
    
    skills: [
      {
        name: 'createLinkedInPost',
        description: 'Generates a professional LinkedIn post based on topic and tone',
        parameters: {
          type: 'object',
          properties: {
            topic: {
              type: 'string',
              description: 'The topic or subject of the LinkedIn post'
            },
            tone: {
              type: 'string',
              description: 'The tone of the post',
              enum: ['professional', 'thoughtful', 'inspirational', 'analytical']
            },
            includeHashtags: {
              type: 'boolean',
              description: 'Whether to include relevant hashtags'
            },
            postType: {
              type: 'string',
              description: 'Type of post to create',
              enum: ['thought_leadership', 'industry_insight', 'career_tip', 'company_update']
            }
          },
          required: ['topic']
        },
        handler: async (params: PostParameters): Promise<PostOutput> => {
          const { 
            topic, 
            tone = 'professional', 
            includeHashtags = true,
            postType = 'thought_leadership'
          } = params;
          
          let postContent: string;
          let generationMethod: 'ai' | 'template' = 'template';
          
          try {
            // Use AI if available, otherwise fallback to templates
            if (aiBinding) {
              postContent = await generateAIPost(aiBinding, topic, tone, postType);
              generationMethod = 'ai';
            } else {
              postContent = getPostTemplate(topic, postType, tone);
            }
          } catch (error) {
            // Fallback to templates if AI generation fails
            console.error('AI generation failed:', error);
            postContent = getPostTemplate(topic, postType, tone);
          }
          
          // Add hashtags if requested
          const contentWithHashtags = includeHashtags ? 
            `${postContent}\n\n${generateHashtags(topic, postType)}` : 
            postContent;
          
          // Format for LinkedIn
          const formattedPost = formatLinkedInPost(contentWithHashtags, topic);
          
          return {
            content: formattedPost,
            metadata: {
              type: 'linkedin_post',
              topic,
              tone,
              postType,
              generationMethod,
              characterCount: formattedPost.length,
              recommendedPostTime: 'Tuesday or Thursday between 10-11am',
              generatedAt: new Date().toISOString()
            }
          };
        }
      }
    ]
  });
}