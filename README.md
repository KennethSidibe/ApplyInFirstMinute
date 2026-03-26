🚀 AI Job Matcher & Discovery Tool: ApplyInFirstMinute
An automated pipeline that scrapes live LinkedIn job postings, parses a local PDF resume, and uses Google Gemini AI to rank the best career matches based on your specific professional background.

🛠️ Features
Multi-Profile Discovery: Search for different roles (e.g., Data Science, IT Business) across multiple locations simultaneously.

Smart Filtering: Automatically excludes jobs containing specific keywords (e.g., "Senior," "Manager") to keep results relevant.

PDF Parsing: Extracts raw text from complex PDF resumes using pdf-parse.

AI Ranking: Integration with Chatgpt #chat version# Flash to provide a "Match Score" and custom reasoning for every job found.

📂 Project Structure
discovery.js: The engine that communicates with the LinkedIn Scraper API.

parser.js: Converts your Resume.pdf into a machine-readable .txt file.

matcher.js: The AI logic that compares your resume to the scraped jobs.

config.json: Centralized configuration for keywords, locations, and exclusions.

🚀 Getting Started
1. Prerequisites
Node.js (v18 or higher)

A RapidAPI account (for LinkedIn scraping)

A Google AI Studio API Key (for Gemini)#Change with the corresponding one in chatgpt

2. Installation
Bash
# Clone the repository
git clone https://github.com/your-username/ai-job-matcher.git

# Install dependencies
npm install
npm install axios dotenv
3. Configuration
Create a .env file in the root directory:

Plaintext
RAPID_API_KEY=your_rapid_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here # change with chatgpt
Edit config.json to set your target roles:

JSON
{
  "search_profiles": [
    {
      "name": "Data_Science",
      "keywords": ["Data Analyst", "Data Scientist"],
      "locations": ["Montreal", "Remote"]
    }
  ],
  "exclusions": ["Senior", "Lead", "Director"]
}

🖥️ Usage
Run the pipeline in three simple steps:

Find Jobs:node discovery.js (Generates raw_jobs.json)

Parse Resume:node parser.js (Generates resume_text.txt)

Get AI Matches:node matcher.js (Outputs top 3 matches to the console)

📝 License
Distributed under the MIT License. See LICENSE for more information. #to be reviewed