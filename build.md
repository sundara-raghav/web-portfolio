# Build & Deploy Instructions

## 1. Inject Environment Variables

Create a `.env` file from `.env.example` and set your Web3Forms key:

    WEB3FORMS_ACCESS_KEY=your-real-key

Run this Node.js one-liner to generate `config.js`:

    node -e "require('fs').writeFileSync('config.js', `window.CONFIG={WEB3FORMS_ACCESS_KEY:'${require('dotenv').config().parsed.WEB3FORMS_ACCESS_KEY}'};")"

Or use any method to inject the key into `config.js` as a global variable.

## 2. Blog Posts

- Add markdown files to `blog/` (e.g., `post-1.md`).
- Use any markdown-to-html tool (like `marked`, `markdown-it`, or online converter) to generate HTML files for each post.
- Link posts in `blog.html`.

## 3. Deploy to AWS S3

- Create an S3 bucket, enable static website hosting.
- Upload all files (including generated `config.js`).
- Set index document: `index.html`, error document: `404.html` (optional).
- Set bucket policy for public read access.
- (Optional) Set CORS for Web3Forms:

```
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["POST"],
    "AllowedOrigins": ["*"]
  }
]
```

## 4. Test Web3Forms Locally

- Open `contact.html` in browser.
- Fill out and submit the form.
- You will receive an email at the address provided (check spam folder if not received).

## 5. Resume Download

- Place your resume PDF in `assets/resume.pdf`.
- The download button will link to this file.
