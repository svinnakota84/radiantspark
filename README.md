# Radiant Spark Global & SparkSync Mobile OS
Official Web Platform & PWA Super-App for Radiant Spark LLC (United States) & RDNT Sparkle Industries LLP (India).

---

## 📦 Why We Have Two .ZIP Files

When downloading your application files, you have two options depending on your goal:

### 1. `radiant-spark-production-dist.zip` (Production Build / Hosting Ready)
- **Who it is for**: Non-developers, direct web hosting, GitHub Pages, cPanel, Apache, Nginx, or Netlify.
- **What is inside**: The pre-compiled, optimized static website files (`index.html`, `app.html`, `portal.html`, `sparkdeals.html`, minified JS/CSS in `assets/`, 3D interactive engine, logos, `manifest.json`, and service worker).
- **No Node.js Required**: You do **not** need `npm`, `node`, or build tools to run this.

### 2. `radiant-spark-full-codebase.zip` (Developer Source Code)
- **Who it is for**: Software engineers, React developers, and Git version control.
- **What is inside**: The raw TypeScript source files (`src/`), Vite configuration (`vite.config.ts`), Tailwind CSS configs, `package.json`, and dependencies list.
- **Development Commands**: Run `npm install`, then `npm run dev` to start the local development server on port 3000.

---

## 🚀 Can I Directly Upload the Production Build Files to GitHub?

### **YES! Absolutely.**
If your goal is to have GitHub host your website for free with an automated SSL certificate using **GitHub Pages**, follow these 3 quick steps:

### Step 1: Extract the Production ZIP
1. Download `radiant-spark-production-dist.zip`.
2. Unzip it on your computer. You will see `index.html`, `app.html`, `sparkdeals.html`, `portal.html`, `assets/`, `manifest.json`, and images.

### Step 2: Upload to GitHub Repository
1. Open your GitHub account and create a new repository (e.g. `radiantspark` or `<your-username>.github.io`).
2. Make sure it is set to **Public** (required for free GitHub Pages).
3. Click **Add file** -> **Upload files**.
4. Drag and drop all the files from the extracted folder into GitHub (ensure `index.html` is in the **root** folder of the repository, not inside a subfolder).
5. Click the green **Commit changes** button.

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click on **Settings** (top navigation tab).
2. On the left sidebar, click on **Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
4. Click **Save**.
5. Within 60 seconds, GitHub will display:
   > *"Your site is live at `https://<your-username>.github.io/<repo-name>/`"*
6. Both the main corporate site (`/`) and mobile app (`/app.html`) will work seamlessly!

---

## 🌐 Connecting Your Custom Domain (`radiantsparkllc.com`)
1. In your GitHub repository **Settings** -> **Pages**, scroll down to **Custom domain**.
2. Type `radiantsparkllc.com` and click **Save**.
3. Check the box for **Enforce HTTPS**.
4. In your domain registrar (GoDaddy, Namecheap, Google Domains/Squarespace, or Cloudflare), add:
   - A records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - CNAME record for `www` pointing to `<your-username>.github.io`.
