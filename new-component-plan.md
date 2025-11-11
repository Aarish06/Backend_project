## Deployment by Vercel 
To deploy my api on Vercel
- I will merge my my all feature brnaches into main.
- Then i will go to Vercel and connect my GitHub account.
- Them i will import my project choose my repo.
- Vercel will automatically detect the framework and set the correct build settings.
- Finally, i will review or edit those settings if needed.

# How it integrates with your API
- Vercel builds your repo on each push and serves your Express app as a serverless function or Node server (via vercel.json).
- Environment variables are stored in Vercel and injected at runtime.

# Why consider it
- Free tier works for demos.
- Zero-config deploys from GitHub.
- Auto previews for PRs.

## Express-rate-limit
To add rate limiting
- I will create new branch to work on.
- Then i will install Express-rate-limit package.
- Then i will add the code to add timelimit and the maximum requests to the the app or server files.
- For the testing, I will save and run the file.
- If the requests exceed the required limit, it should give the message error 429.
- If failed, i will change the correct code to produce the result, repeating till i get error message for to many requests
- If successful, will commit and merge to main branch.

# How it integrates with your API
- Middleware that sits before your routes.
- Counts requests per IP in memory and blocks extra requests with HTTP 429.

# Why consider it
- Protects against abuse and noisy clients.
- Easy to demo in Postman.