# LinkedIn Post Generator Worker

A Cloudflare Worker that uses an agent-based approach with Workers AI to generate professional LinkedIn posts.

## Features

- AI-powered LinkedIn content generation using Workers AI
- Fallback to templates if AI is unavailable
- Multiple post types: thought leadership, industry insights, career tips, and company updates
- Four professional tones: professional, thoughtful, inspirational, and analytical
- Automatic hashtag generation
- LinkedIn-optimized formatting

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Development](#development)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Examples](#examples)
- [Customization](#customization)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/linkedin-post-generator.git
   cd linkedin-post-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Cloudflare Wrangler:

   ```bash
   npm install -g wrangler
   wrangler login
   ```

4. Configure your `wrangler.toml` file:

   ```toml
   name = "linkedin-post-generator"
   main = "src/index.ts"
   compatibility_date = "2023-10-02"

   [vars]
   # Add your environment variables here

   # Enable Workers AI binding
   [[ai]]
   binding = "AI"
   ```

## Usage

### API Endpoints

The Worker exposes the following endpoints:

- `GET /`: A simple health check endpoint
- `POST /generate`: Generates a LinkedIn post based on parameters

### Generate a LinkedIn Post

Send a POST request to the `/generate` endpoint with the following JSON structure:

```json
{
	"topic": "digital transformation",
	"tone": "analytical",
	"includeHashtags": true,
	"postType": "industry_insight"
}
```

#### Request Parameters

| Parameter         | Type    | Required | Default              | Description                                                                                          |
| ----------------- | ------- | -------- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| `topic`           | string  | Yes      | -                    | The subject of your LinkedIn post                                                                    |
| `tone`            | string  | No       | "professional"       | The writing style (options: "professional", "thoughtful", "inspirational", "analytical")             |
| `includeHashtags` | boolean | No       | true                 | Whether to add hashtags to the post                                                                  |
| `postType`        | string  | No       | "thought_leadership" | The type of post (options: "thought_leadership", "industry_insight", "career_tip", "company_update") |

#### Response Format

The API returns a JSON response with the following structure:

```json
{
	"content": "Your formatted LinkedIn post content...",
	"metadata": {
		"type": "linkedin_post",
		"topic": "digital transformation",
		"tone": "analytical",
		"postType": "industry_insight",
		"generationMethod": "ai",
		"characterCount": 573,
		"recommendedPostTime": "Tuesday or Thursday between 10-11am",
		"generatedAt": "2025-03-29T12:34:56.789Z"
	}
}
```

### Example Request Using cURL

```bash
curl -X POST http://localhost:8787/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "remote work productivity",
    "tone": "thoughtful",
    "includeHashtags": true,
    "postType": "career_tip"
  }'
```

### Example Request Using JavaScript

```javascript
const response = await fetch('http://localhost:8787/generate', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		topic: 'blockchain in supply chain',
		tone: 'professional',
		includeHashtags: true,
		postType: 'industry_insight',
	}),
});

const result = await response.json();
console.log(result);
```

## Development

### Local Development

1. Start the development server:

   ```bash
   wrangler dev
   ```

2. The server will start at `http://localhost:8787` by default.

3. Test your endpoints using cURL or your preferred API testing tool.

### Project Structure

```
linkedin-post-generator/
├── src/
│   ├── index.ts                # Main entry point
│   ├── types.ts                # TypeScript type definitions
│   ├── templates.ts            # Fallback post templates
│   ├── formatters.ts           # Content formatting utilities
│   └── ai-generator.ts         # Workers AI integration
├── wrangler.toml               # Cloudflare Workers configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Deployment

### Deploy to Cloudflare Workers

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy to Cloudflare Workers:

   ```bash
   wrangler publish
   ```

3. Your API will be available at your Cloudflare Workers subdomain (e.g., `https://linkedin-post-generator.yourusername.workers.dev`).

## Architecture

The application follows a simple architecture:

1. The `index.ts` file defines the Hono application and routes.
2. When a request is received:
   - Input validation is performed using Zod
   - If Workers AI is available, it generates a post using the AI model
   - If AI is unavailable or fails, it falls back to predefined templates
   - Hashtags are added if requested
   - The post is formatted for LinkedIn
   - Metadata is attached to the response

## Examples

### Thought Leadership Post

**Request:**

```json
{
	"topic": "sustainable business practices",
	"tone": "inspirational",
	"includeHashtags": true,
	"postType": "thought_leadership"
}
```

**Response:**

```json
{
	"content": "The future belongs to companies that embrace sustainability not as a checkbox, but as a core value that drives innovation and growth.\n\nWhen we prioritize the planet alongside profit, we're not just doing good—we're building resilience into our business models. The data is clear: sustainable companies outperform their peers in the long run.\n\nThe greatest leaders of tomorrow won't just ask \"Is this profitable?\" but \"Is this sustainable for our people, our planet, and our future?\"\n\n#Sustainability #BusinessLeadership #GreenInnovation #FutureOfBusiness",
	"metadata": {
		"type": "linkedin_post",
		"topic": "sustainable business practices",
		"tone": "inspirational",
		"postType": "thought_leadership",
		"generationMethod": "ai",
		"characterCount": 456,
		"recommendedPostTime": "Tuesday or Thursday between 10-11am",
		"generatedAt": "2025-03-29T12:34:56.789Z"
	}
}
```

### Career Tip Post

**Request:**

```json
{
	"topic": "negotiating salary",
	"tone": "professional",
	"includeHashtags": true,
	"postType": "career_tip"
}
```

**Response:**

```json
{
	"content": "Three things to remember when negotiating your salary:\n\n1. Research is your strongest ally. Know your market value based on industry, location, and experience.\n\n2. Focus on the value you bring, not just what you need financially.\n\n3. Practice your talking points beforehand and anticipate objections.\n\nRemember, negotiation isn't confrontation—it's a collaborative discussion about fair compensation for the value you provide.\n\n#CareerAdvice #SalaryNegotiation #ProfessionalGrowth #WorkplaceTips",
	"metadata": {
		"type": "linkedin_post",
		"topic": "negotiating salary",
		"tone": "professional",
		"postType": "career_tip",
		"generationMethod": "ai",
		"characterCount": 489,
		"recommendedPostTime": "Tuesday or Thursday between 10-11am",
		"generatedAt": "2025-03-29T12:34:56.789Z"
	}
}
```

## Customization

### Adding New Post Types

To add new post types, update the `PostType` type in `types.ts` and add corresponding templates in `templates.ts`. You'll also need to update the AI prompt in `ai-generator.ts` to handle the new post type.

### Modifying Tones

To modify or add tones, update the `PostTone` type in `types.ts` and adjust the templates and AI prompts accordingly.

### Custom Hashtag Generation

Customize the hashtag generation logic in the `generateHashtags` function in `formatters.ts`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
