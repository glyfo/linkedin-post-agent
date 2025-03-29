/**
 * Generates hashtags for a LinkedIn post
 */
export function generateHashtags(topic: string, postType: string): string {
    // Common professional hashtags
    const baseHashtags = ['Leadership', 'Innovation'];
    
    // Create topic-specific hashtags
    const topicWords = topic.split(' ');
    const topicHashtags = topicWords
      .filter(word => word.length > 3)
      .map(word => `#${word.charAt(0).toUpperCase() + word.slice(1).replace(/[^a-zA-Z0-9]/g, '')}`);
    
    // Post type specific hashtags
    const typeHashtags: Record<string, string[]> = {
      thought_leadership: ['#ThoughtLeadership', '#FutureOfWork'],
      industry_insight: ['#IndustryTrends', '#MarketInsights'],
      career_tip: ['#CareerAdvice', '#ProfessionalGrowth'],
      company_update: ['#CompanyNews', '#BusinessGrowth']
    };
    
    // Combine and limit hashtags
    const allHashtags = [
      ...(typeHashtags[postType] || []), 
      ...topicHashtags, 
      ...baseHashtags
    ];
    
    return allHashtags.slice(0, 5).join(' ');
  }
  
  /**
   * Formats a post for LinkedIn
   */
  export function formatLinkedInPost(post: string, topic: string): string {
    // Add paragraph breaks
    const withParagraphs = post.replace(/\. /g, '.\n\n');
    
    // Add engagement question
    return `${withParagraphs}\n\nWhat's your experience with ${topic}?`;
  }