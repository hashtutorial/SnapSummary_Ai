### Daily log:

##  Day 1: n8n Webhooks Integration
- Successfully set up and activated a dedicated n8n cloud instance.
- Understood the role of webhooks and how they enable external services to push data into workflows.
- Created a Webhook node with the POST method and tested it with JSON input.
- Verified successful data reception in n8n's execution panel.
- Ready to process and summarize the data using LLMs in the next step.

##  Day 2: LLM Agents & AI Flows in n8n
Explored LLM Chain node in n8n for integrating AI summarization into workflows.
Configured a webhook trigger and tested blog content input via Postman.
Crafted an optimized prompt to extract concise blog summaries in bullet format.
Verified LLM output and ensured the input content was correctly parsed and summarized.
Successfully built a working blog summarizer agent with AI + automation in n8n.

## Day 3: LLM Chains & AI Agents in n8n
Configured the LLM Request node using Together AI with the Mixtral-8x7B-Instruct model for generating blog summaries.
Designed a clear summarization prompt using {{ $json.body.input }} and ensured correct JSON body formatting.
Linked the LLM output to a Set node and finalized response handling using the Respond to Webhook node.
Confirmed smooth end-to-end flow of blog content → LLM summary → frontend via API.

## Day 4: PostgreSQL Integration with Prisma + Live Webhook Automation
Understood the purpose of PostgreSQL for structured summary logging.
Installed and configured PostgreSQL 17 and connected it via pgAdmin.
Ran npx prisma init to generate Prisma schema and client.
Designed a Prisma model to log blog input, summaries, and user IP addresses.
Connected Prisma to the database and tested local writes successfully.
Created a submit API route that:
Accepts user blog input
Forwards it to n8n
Logs the input and response summary to the PostgreSQL database

## Day 5: MongoDB + Mongoose CRUD:
Schema definition with Mongoose
Creating, reading, updating, and deleting 
Express routing and controller separation
API testing using Postman and frontend integration
