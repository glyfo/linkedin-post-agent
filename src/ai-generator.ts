import { WorkersAI, PostTone, PostType } from './types';

/**
 * Generates a LinkedIn post using Workers AI
 */
export async function generateAIPost(
  aiBinding: WorkersAI,
  topic: string,
  tone: PostTone,
  postType: PostType,
  options: {
    maxLength?: number;
    model?: string;
  } = {}
): Promise<string> {
  // Set defaults for optional parameters
  const {
    maxLength = 1300,
    model = '@cf/meta/llama-3-8b-instruct',
  } = options;
  
  // Descriptions for different post types
  const postTypeDescriptions: Record<string, string> = {
    thought_leadership: "sharing innovative ideas to position yourself as an industry leader",
    industry_insight: "providing analysis of industry trends and developments",
    career_tip: "offering professional advice and development strategies",
    company_update: "sharing news about your organization's achievements",
    industry_news: "sharing breaking news and developments in your industry",
    case_study: "presenting a real-world example with results and lessons learned",
    personal_achievement: "highlighting personal or team accomplishments with humility"
  };
  
  // Instructions for different tones
  const toneInstructions: Record<string, string> = {
    professional: "Use a formal, authoritative tone with clear points.",
    thoughtful: "Use a reflective tone that poses questions and explores implications.",
    inspirational: "Use an uplifting, motivational tone with powerful language.",
    analytical: "Use a data-driven tone with statistics and structured analysis.",
    casual: "Use a conversational, approachable tone that feels authentic.",
    technical: "Use precise terminology and structured explanations relevant to experts."
  };
  
  // Fallback descriptions if tone or postType aren't in the mappings
  const postTypeDescription = postTypeDescriptions[postType] || 
    "sharing professional insights and perspectives";
  const toneInstruction = toneInstructions[tone] || 
    "Use a clear, professional tone appropriate for LinkedIn.";
  
  // Create the prompt with more detailed guidance
  const prompt = `
    Create a LinkedIn post about "${topic}" in the style of ${postTypeDescription}.
    
    Tone: ${toneInstruction}
    
    Guidelines:
    - Write 3-4 short paragraphs with a logical flow
    - Include one concrete example or data point to add credibility
    - End with a question that encourages engagement
    - Keep under ${maxLength} characters total
    - No hashtags or emojis in the content
    - Focus on providing value to the reader
    - Use white space effectively for readability
  `;
  
  try {
    // Call Workers AI with improved parameters
    const aiResponse = await aiBinding.run(model, {
      messages: [
        { 
          role: 'system', 
          content: 'You are a professional LinkedIn content creator who specializes in creating engaging, valuable posts that drive engagement while maintaining a professional image.' 
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: Math.min(1000, Math.ceil(maxLength / 2)) // Reasonable token limit based on expected length
    });
    
    // Clean up and normalize the response
    const cleanedResponse = aiResponse.response
      .trim()
      .replace(/#\w+/g, '') // Remove hashtags
      .replace(/[^\S\r\n]+/g, ' ') // Normalize whitespace (preserve line breaks)
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple line breaks
      .trim();
    
    // Verify response length
    if (cleanedResponse.length > maxLength) {
      // If too long, truncate at the last sentence before the limit
      const truncatedText = cleanedResponse.substring(0, maxLength);
      const lastSentenceEnd = Math.max(
        truncatedText.lastIndexOf('.'), 
        truncatedText.lastIndexOf('?'), 
        truncatedText.lastIndexOf('!')
      );
      
      return lastSentenceEnd > 0 
        ? cleanedResponse.substring(0, lastSentenceEnd + 1) 
        : truncatedText;
    }
    
    return cleanedResponse;
  } catch (error) {
    console.error('AI post generation failed:', error instanceof Error ? error.message : String(error));
    throw new Error(`Failed to generate post with AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}