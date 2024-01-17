# FileFlow
FileFlow is a Progressive Web Application (PWA) built with **Nuxt.js** and **TypeScript**, powered by **Google Cloud Platform**. It focuses on file sharing and real-time communication features. The application uses **Tailwind CSS** for styling and has a variety of components for building its user interface.

## Features
- **File Sharing**: The platform lets you share files using short links. These links are valid for up to 24 hours, with a maximum of 5 file uploads per day. It uses **Google Cloud Storage**.

- **Peer Portal**: It is a stateless file transfer service between peers using **WebRTC** and **peer.js**.

- **AI Studio**: It lets you use **Google's Gemini Model** to analyze your files and prompt these files using AI. It supports .txt, .pdf, .docx-based files for text-based prompts and .png, .jpg for image files.

## Technologies Used
- Google Cloud Platform - Cloud Run, Cloud Functions, Vertex AI Platform, Compute Engine, Job Scheduler 
- Nuxt.js
- Tailwind CSS
- Peer.js


## Preview
#### Home Page
![Home Hero Section](/public/images/readme_preview/HomeHero.png)
![Home Hero Section](/public/images/readme_preview/HomeGetStarted.png)
#### Peer Portal
![Peer Portal](/public/images/readme_preview/PeerPortal.png)
#### AI Studio
![AI Studio](/public/images/readme_preview/AiStudio.png)
#### Dark Mode
![Dark Mode](/public/images/readme_preview/HomeHeroDark.png)

## Local Development
Make sure to authenticate using GCloud CLI with the respective service account.
Define Environment variables in *.env* file.(Use *.env.demo* for referrence)
Installing dependencies
```bash
npm i
```
Run develpoment server
```bash
npm run dev
```

## Google Cloud Run Deployment
Make sure to define the environment variables in *.env.yaml* file.(Use *.env.example.yml* for referrence)
Replace the service account mail ID with your respective server account

```bash
gcloud run deploy file-flow --source=. --allow-unauthenticated --platform=managed --region=us-central1 --port=3000 --service-account=${service_account_mail} --env-vars-file .env.yaml
```
