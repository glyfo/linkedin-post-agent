/**
 * Returns a template-based LinkedIn post
 */
export function getPostTemplate(
    topic: string,
    postType: string,
    tone: string
  ): string {
    // Templates organized by post type and tone
    const templates: Record<string, Record<string, string>> = {
      thought_leadership: {
        professional: `I've been reflecting on ${topic} in our industry. Three key trends stand out: increasing adoption, integration with existing systems, and focus on user experience.`,
        thoughtful: `${topic} raises important questions about our approach to business challenges. Perhaps the most valuable insight is the process of discovery itself.`,
        inspirational: `The journey to mastering ${topic} taught me that persistence matters more than perfection. Every setback provides clarity for the path forward.`,
        analytical: `Analyzing ${topic} reveals fascinating patterns. Organizations prioritizing stakeholder alignment see 40% better outcomes.`
      },
      industry_insight: {
        professional: `Recent developments in ${topic} are reshaping industry standards. Companies that adapt quickly gain significant competitive advantages.`,
        thoughtful: `The conversation around ${topic} often overlooks broader implications. We should consider how these changes impact workplace dynamics.`,
        inspirational: `Innovation in ${topic} doesn't always mean disruption. Sometimes, the most powerful advances come from thoughtful iteration.`,
        analytical: `Industry adoption of ${topic} reveals three patterns: phased rollouts, department-specific pilots, and full-scale transformation.`
      },
      career_tip: {
        professional: `When developing expertise in ${topic}, focus on complementary skills that enhance your primary knowledge area.`,
        thoughtful: `Your relationship with ${topic} shouldn't be static. Reassess how this knowledge serves your professional narrative.`,
        inspirational: `Mastery of ${topic} isn't just technical proficiency—it's developing perspective that connects to broader objectives.`,
        analytical: `The career impact of ${topic} specialization varies by industry, with highest ROI in technology, healthcare, and financial services.`
      },
      company_update: {
        professional: `I'm pleased to share our team's progress on ${topic}. This initiative aligns with our strategic objectives for growth.`,
        thoughtful: `Our journey with ${topic} has taught us valuable lessons about collaboration and innovation.`,
        inspirational: `Today marks an important milestone in our ${topic} project. This achievement reflects extraordinary commitment.`,
        analytical: `Our ${topic} initiative has yielded measurable improvements: 23% efficiency increase and 18% cost reduction.`
      }
    };
    
    // Return matching template or fallback
    return templates[postType]?.[tone] || 
      `Sharing thoughts on ${topic} and its impact on our professional landscape.`;
  }