require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class JobDiscovery {
    constructor(configPath = './config.json') {
        const rawconfig = fs.readFileSync(configPath);
        this.config = JSON.parse(rawconfig);

        this.apiKey = process.env.RAPID_API_KEY;
        // EXACT URL from your screenshot
        this.url = "https://linkedin-jobs-scraper2.p.rapidapi.com/api/search/"; 
    }

    async fetchJobs(keywords, location) {
        const options = {
            method: 'GET',
            url: this.url,
            params: {
                keywords: keywords, // Corrected parameter name from screenshot
                location: location,
                start: '0'          // Required for page 1
            },
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': 'linkedin-jobs-scraper2.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
    
            // ACCORDING TO YOUR DEBUG: 
            // The response has a "data" property, which contains ANOTHER "data" property, which has "jobs".
            const jobs = response.data.data && response.data.data.jobs ? response.data.data.jobs : [];
            
            console.log(`Successfully pulled ${jobs.length} jobs for ${keywords}`);
            return jobs;
        } catch (error) {
            console.error(`Error fetching ${keywords}: ${error.message}`);
            return [];
        }
    }

    filterExclusions(jobs) {
        const excludedWords = this.config.exclusions || [];
        if (!Array.isArray(jobs)) return [];

        return jobs.filter(job => {
            // Check 'title' or 'jobTitle' depending on exact API response
            const title = (job.title || job.jobTitle || "").toLowerCase();
            return !excludedWords.some(word => title.includes(word.toLowerCase()));
        });
    }

    async runAllSearches() {
        let allFoundJobs = [];

        for (const profile of this.config.search_profiles) {
            console.log(`--- Running Profile: ${profile.name} ---`);
            for (const kw of profile.keywords) {
                for (const loc of profile.locations) {
                    console.log(`Searching for ${kw} in ${loc}...`);
                    const jobs = await this.fetchJobs(kw, loc);
                    
                    if (Array.isArray(jobs)) {
                        allFoundJobs = [...allFoundJobs, ...jobs];
                    }
                    
                    console.log(`Found ${jobs.length || 0} raw results. Waiting for rate limit...`);
                    await sleep(3000);
                }
            }
        }
        return this.filterExclusions(allFoundJobs);
    }
}

// EXECUTION
(async () => {
    try {
        const discovery = new JobDiscovery();
        const finalJobs = await discovery.runAllSearches();

        fs.writeFileSync('raw_jobs.json', JSON.stringify(finalJobs, null, 4));
        console.log(`\nSuccess! Final filtered list contains ${finalJobs.length} jobs.`);
    } catch (err) {
        console.error("System Error:", err.message);
    }
})();