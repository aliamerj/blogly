# Blogly

<div align="center">
  <a href="https://blogly.co">
  <img src="https://github.com/aliamerj/blogly/blob/main/app/opengraph-image.jpg" alt="Blogly">
  </a>
     <h3>Blogly</h3>
  <p><strong>Free, open-source blog management tool designed to simplify content creation and management for web applications. It provides an easy-to-use dashboard for creating and editing posts, and it seamlessly integrates with your web apps, allowing you to focus on building your projects while Blogly handles your blog management.</strong></p>
</div>
<div align="center">
<a href="https://www.producthunt.com/posts/simplify-blog-management-in-your-tool?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-simplify&#0045;blog&#0045;management&#0045;in&#0045;your&#0045;tool" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=461171&theme=neutral" alt="Simplify&#0032;Blog&#0032;Management&#0032;in&#0032;Your&#0032;tool - Effortlessly&#0032;integrate&#0032;and&#0032;manage&#0032;blogs&#0032;in&#0032;your&#0032;web&#0032;app | Product Hunt" style={{width:'250px', height:"54px"}} width="250" height="54" /></a>
</div>
<br/>


## Features
- **Easy-to-Use Dashboard**: Create and edit blog posts effortlessly with a user-friendly interface.
- **Seamless Integration**: Integrates with your Next.js, React, or any other web app through simple API endpoints.
- **Open Source**: Free and open-source, ensuring transparency and community-driven development.

## Technology Stack

- **Frontend/Backend:** Next js 14
- **Database:** PostgreSQL
- **Host:**  AWS Amplify - S3
  
## API Endpoints

### Get All Blogs

```http
GET /api/blogs
```
#### Example:
```javascript
const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
};

fetch('https://blogly.co/api/blogs', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```
### Get Specific Blog
```http
GET /api/blogs/{id}
```
#### Example:
```javascript
const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
};

fetch('https://blogly.co/api/blogs/{id}', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```


## Contributing
We welcome contributions to Blogly! If you'd like to help improve the platform, please fork the repository and create a pull request with your changes. Ensure that your code adheres to our coding standards and includes relevant tests

1. **Clone the repository**
2. **Install packages:**  ```npm install```
4. **Set up the environment variables:**
     3. set up .env
   ```bash
   NEXTAUTH_URL="http://localhost:3000"
   AUTH_TRUST_HOST=http://localhost:3000
   AUTH_URL=http://localhost:3000
   AUTH_GITHUB_ID=....
   AUTH_GITHUB_SECRET=....
   AUTH_SECRET=....
   AUTH_GOOGLE_ID=....
   AUTH_GOOGLE_SECRET=....
   DRIZZLE_DATABASE_URL=....
   S3_NAME= ...
   S3_REGIN= ...
   IAM_KEY=....
   IAM_SECRET=....
   API_SECRET=....
   ```
6. **Run the app:**  ``` npm run dev ```
