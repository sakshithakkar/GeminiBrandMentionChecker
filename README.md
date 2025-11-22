# 🚀 Gemini Brand Mention Checker

A simple web app that checks whether a **brand** is mentioned in a Gemini-generated response for a given **prompt**, including the **position** of the mention.
Supports **fuzzy matching**, **CSV download**, **error fallback**, and clean UI.

---

## 🔗 **Live Demo Links**

### 🌐 Frontend (Vercel)


```
https://gemini-brand-mention-checker.vercel.app/
```

### 🛠 Backend (Render)


```
https://geminibrandmentionchecker.onrender.com
```

---

# 📌 Features

* ✔ One-page clean UI
* ✔ Prompt + Brand input
* ✔ Loading animation
* ✔ Exact + Fuzzy brand match
* ✔ Position detection (1, 2, 3...)
* ✔ CSV download
* ✔ Proper error fallback
* ✔ Backend only stores API key
* ✔ Fully deployed on free tiers
* ✔ No database needed

---

# 🧠 Model Details (MANDATORY)

| Setting         | Value                           |
| --------------- | ------------------------------- |
| **Model**       | `gemini-2.5-flash`              |
| **Temperature** | `0.2` (fixed)                   |
| **Reason**      | Least expensive + stable output |

---

# 🏗 Tech Stack

### **Frontend**

* React (JavaScript)
* Pure CSS styling
* Hosted on **Vercel**

### **Backend**

* Node.js
* Express.js
* Google Gemini API
* Hosted on **Render**
* API key stored in server environment variable

---

# 🔧 How It Works

1. User enters:

   * Prompt
   * Brand name
2. Frontend sends a POST request:

   ```
   /api/check
   ```
3. Backend calls Gemini using the fixed model:

   * `gemini-2.5-flash`
   * `temperature: 0.2`
4. Gemini returns a text response
5. Backend performs:

   * Exact match
   * Fuzzy match (case-insensitive + partial match)
6. Position is determined:

   * First mention = 1
   * Second mention = 2
7. JSON result returned to frontend:

   ```json
   {
     "mentioned": true,
     "position": 1
   }
   ```
8. UI shows results in a table
9. User can download the table as CSV

---

# 🧪 Sample Test Data (from assignment)

### **Test 1**

Prompt:

```
Give a list of best marketing analytics tools
```

Brand:

```
Matomo
```

### **Test 2**

Prompt:

```
what are some good and cost effective email marketing platforms for small businesses
```

Brand:

```
mailchimp
```

Supports **exact** and **fuzzy matches** like:

* "Mail Chimp"
* "mailchimp"
* "MAILCHIMP"
* "MailChimp"
* "mail-chimp"

---

# 🔥 API Endpoint

### **POST /check**

#### Request Body

```json
{
  "prompt": "Recommend CRM tools",
  "brand": "Salesforce"
}
```

#### Successful Response

```json
{
  "mentioned": true,
  "position": 2
}
```

#### Error Fallback Response

```json
{
  "mentioned": false,
  "position": null
}
```

---

# 🛡 Error Handling

* If the Gemini API fails (rate limit, invalid key, etc.)
* Backend returns a **safe fallback**, not an error
* UI still loads and shows a graceful message

This meets the assignment requirement:

> “On API error return a canned answer so the app still works.”


# 🚀 Deployment Instructions

## **Deployment (Frontend – Vercel)**

1. Push frontend folder to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import project
4. Set:

   ```
   VITE_API_URL=https://your-backend-url/check
   ```
5. Deploy

---

## **Deployment (Backend – Render / Railway)**

1. Push backend to GitHub
2. Go to Render: [https://render.com](https://render.com)
3. Create → Web Service
4. Set:

   ```
   API_KEY=your-gemini-key
   ```
5. Set build command:

   ```
   npm install
   ```
6. Set start command:

   ```
   node server.js
   ```
7. Deploy
8. Copy the backend URL & put it in frontend

---

# 👨‍💻 Local Development

### Backend:

```
cd backend
npm install
npm start
```

### Frontend:

```
cd frontend
npm install
npm run dev
```

---




