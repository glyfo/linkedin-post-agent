/**
 * LinkedIn Post Template Generator
 * Provides customizable, professional templates for various post types and tones
 */

// Template type definitions
type ToneOptions = 'professional' | 'thoughtful' | 'inspirational' | 'analytical';
type PostTypeOptions = 'thought_leadership' | 'industry_insight' | 'career_tip' | 'company_update';

// Template collections organized by category and tone
const TEMPLATES = {
  thought_leadership: {
    professional: (topic: string) => 
      `I've been reflecting on ${topic} and its impact on our industry. Three key trends worth noting: innovation acceleration, cross-functional integration, and enhanced user experiences. What trends are you seeing?`,
    
    thoughtful: (topic: string) => 
      `${topic} represents more than just another business trend—it's changing how we approach fundamental challenges. Perhaps the most valuable insight isn't the answer itself, but the questions it forces us to ask about our work.`,
    
    inspirational: (topic: string) => 
      `My journey with ${topic} taught me that progress matters more than perfection. Every obstacle has revealed new opportunities and clarified our path forward. The greatest breakthroughs often come after the biggest challenges.`,
    
    analytical: (topic: string) => 
      `Analyzing ${topic} across industries reveals compelling patterns. Organizations prioritizing stakeholder alignment see 42% better adoption rates, while those focusing on technical implementation first often struggle with sustainability.`
  },
  
  industry_insight: {
    professional: (topic: string) => 
      `Recent developments in ${topic} are reshaping our industry's landscape. Companies that proactively adapt are gaining remarkable competitive advantages through improved efficiency and innovation capacity.`,
    
    thoughtful: (topic: string) => 
      `The ongoing conversation around ${topic} often overlooks its broader implications. We should consider how these transformations affect workplace culture, professional development, and long-term sustainability.`,
    
    inspirational: (topic: string) => 
      `Innovation in ${topic} doesn't always mean disruption or replacement. Sometimes, the most powerful advances come from thoughtful iteration and building upon established foundations with fresh perspectives.`,
    
    analytical: (topic: string) => 
      `Our analysis of ${topic} adoption reveals three distinct implementation patterns: phased departmental rollouts (63%), targeted pilot programs (27%), and comprehensive transformation initiatives (10%). Each approach offers unique advantages.`
  },
  
  career_tip: {
    professional: (topic: string) => 
      `When developing expertise in ${topic}, focus equally on complementary skills that enhance your primary knowledge area. This multidisciplinary approach creates unique value that differentiates you in competitive environments.`,
    
    thoughtful: (topic: string) => 
      `Your relationship with ${topic} shouldn't remain static throughout your career. Regularly reassess how this knowledge serves your professional narrative and be willing to evolve your approach as markets and opportunities change.`,
    
    inspirational: (topic: string) => 
      `Mastery of ${topic} extends far beyond technical proficiency—it's about developing the perspective that connects specialized knowledge to broader business objectives and human needs. This vision is what transforms expertise into leadership.`,
    
    analytical: (topic: string) => 
      `The career impact of ${topic} specialization varies significantly by industry, with highest ROI currently in technology (27% premium), healthcare (23%), and financial services (19%), according to our latest professional development analysis.`
  },
  
  company_update: {
    professional: (topic: string) => 
      `I'm pleased to share our team's significant progress on ${topic}. This initiative directly supports our strategic objectives for sustainable growth and positions us to better serve our clients' evolving needs.`,
    
    thoughtful: (topic: string) => 
      `Our journey with ${topic} has taught our organization valuable lessons about collaboration, innovation, and resilience. These insights are reshaping not just this project, but how we approach all our work.`,
    
    inspirational: (topic: string) => 
      `Today marks an important milestone in our ${topic} project. This achievement reflects the extraordinary commitment of our team and partners who consistently push boundaries to deliver exceptional results.`,
    
    analytical: (topic: string) => 
      `Our ${topic} initiative has yielded measurable improvements across key metrics: 24% efficiency increase, 18% cost reduction, and 37% higher team engagement scores. These results validate our approach and inform our next phase.`
  }
};

/**
 * Returns a template-based LinkedIn post
 * @param topic - The main subject of the post
 * @param postType - The category of post to create
 * @param tone - The desired tone/voice of the post
 * @returns Formatted post text with topic integrated
 */
export function getPostTemplate(
  topic: string,
  postType: PostTypeOptions | string,
  tone: ToneOptions | string
): string {
  // Ensure we have valid post type and tone
  const validPostType = TEMPLATES[postType as PostTypeOptions] ? 
    postType as PostTypeOptions : 
    'thought_leadership';
    
  const validTone = TEMPLATES[validPostType][tone as ToneOptions] ? 
    tone as ToneOptions : 
    'professional';
  
  // Get the template function and apply it with the topic
  const templateFn = TEMPLATES[validPostType][validTone];
  return templateFn ? templateFn(topic) : 
    `Sharing insights on ${topic} and its impact on our professional landscape. I'd appreciate hearing your thoughts and experiences.`;
}

/**
 * Get all available template options
 * @returns Object containing all post types and tones
 */
export function getTemplateOptions() {
  return {
    postTypes: Object.keys(TEMPLATES),
    tones: Object.keys(TEMPLATES.thought_leadership)
  };
}