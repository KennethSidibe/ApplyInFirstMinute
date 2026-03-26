# 🚀 AI Job Matcher & Discovery Tool: ApplyInFirstMinute
An automated pipeline that scrapes live LinkedIn job postings, parses a local PDF resume, and uses Google Gemini AI to rank the best career matches based on your specific professional background.

## 🛠️ Features
* **Multi-Profile Discovery: Search for different roles (e.g., Data Science, IT Business) across multiple locations simultaneously.

* **Smart Filtering: Automatically excludes jobs containing specific keywords (e.g., "Senior," "Manager") to keep results relevant.

* **PDF Parsing: Extracts raw text from complex PDF resumes using pdf-parse.

* **AI Ranking: Integration with Chatgpt #chat version# Flash to provide a "Match Score" and custom reasoning for every job found.

---

## 📂 Project Structure
| File | Description |
| :--- | :--- |
| `discovery.js` | Connects to LinkedIn Scraper API to find live job postings. |
| `parser.js` | Converts `Marc_Kouame_Resume.pdf` into machine-readable text. |
| `matcher.js` | The "AI Brain" that compares the resume to the jobs found. |
| `config.json` | Centralized settings for your keywords, locations, and exclusions. |
| `raw_jobs.json` | Temporary storage for jobs found during the discovery phase. |

---

## 🚀 Getting Started
### 1. Prerequisites

* **Node.js** (v18 or higher)

* **A RapidAPI account** (for LinkedIn scraping)

* **Google AI Studio API Key** (for Gemini)#Change with the corresponding one in chatgpt

### 2. Installation
```Bash
# Clone the repository
git clone https://github.com/your-username/ai-job-matcher.git


# Install dependencies
npm install
npm install axios dotenv

```

### 3. Environment Variables
Create a .env file in the root directory:

Plaintext
RAPID_API_KEY=your_rapid_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here # change with chatgpt

## 🖥️ Usage
Run the pipeline in three simple steps:

Find Jobs:node discovery.js (Generates raw_jobs.json)

Parse Resume:node parser.js (Generates resume_text.txt)

Get AI Matches:node matcher.js (Outputs top 3 matches to the console)

## ⚙️ Configuration (config.json)

Edit config.json to set your target roles:

```
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

```

## 🛡️ License
Distributed under the MIT License. See LICENSE for more information. #to be reviewed

### **Crucial Step: The `.gitignore`**
Since you are putting this on GitHub, you **must** prevent your API keys and large `node_modules` folder from being uploaded. 

Create a file named **`.gitignore`** (no extension) and paste this:
```text
node_modules/
.env
raw_jobs.json
resume_text.txt