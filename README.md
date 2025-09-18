# פלטפורמת מדיה חברתית - קודקוד

פלטפורמת מדיה חברתית מודרנית הבנויה עם React ו-Node.js, הכוללת כל התכונות הדרושות לרשת חברתית מלאה.

## ✨ תכונות עיקריות

### 👥 ניהול משתמשים
- הרשמה והתחברות משתמשים
- פרופילים אישיים עם תמונת פרופיל
- אימות משתמשים באמצעות JWT
- הצפנת סיסמאות עם bcrypt
- אפשרות התחברות עם Google OAuth

### 📱 פוסטים וקונטנט
- יצירת פוסטים חדשים עם תיאור ותמונות
- עדכון ומחיקת פוסטים
- צפייה בפיד אישי של המשתמש
- פיד ראשי עם פוסטים של משתמשים שאתם עוקבים אחריהם
- העלאת תמונות לפוסטים

### 🤝 אינטראקציות חברתיות
- מערכת עוקבים (Following/Followers)
- לייקים לפוסטים
- תגובות על פוסטים
- חיפוש משתמשים

### 🎨 עיצוב וחוויית משתמש
- עיצוב רספונסיבי
- ממשק משתמש ידידותי
- תמיכה בעברית
- אנימציות וחוויית משתמש מתקדמת

## 🛠️ טכנולוגיות

### Frontend (Client)
- **React 19** - ספריית UI מתקדמת
- **TypeScript** - JavaScript עם טיפוסים סטטיים
- **Vite** - כלי פיתוח מהיר
- **React Router** - ניווט באפליקציה
- **React Icons** - אייקונים
- **Google OAuth** - אימות Google

### Backend (Server)
- **Node.js** - סביבת הרצה
- **Express.js** - פריימוורק שרת
- **Supabase** - בסיס נתונים PostgreSQL כשירות
- **JWT** - אסימוני אימות
- **bcrypt** - הצפנת סיסמאות
- **CORS** - תמיכה בבקשות Cross-Origin
- **Express FileUpload** - העלאת קבצים

## 📁 מבנה הפרויקט

```
Social-media-kodkod/
├── client/                    # אפליקציית React
│   ├── src/
│   │   ├── components/       # רכיבי React
│   │   ├── pages/           # דפי האפליקציה
│   │   ├── styles/          # קבצי CSS
│   │   └── utils/           # פונקציות עזר
│   └── public/              # קבצים סטטיים
├── server/                   # שרת Node.js
│   ├── auth/                # מערכת אימות
│   ├── controllers/         # בקרי API
│   ├── dal/                # שכבת גישה לנתונים
│   ├── database/           # חיבור לבסיס נתונים
│   ├── routes/             # נתיבי API
│   └── services/           # לוגיקה עסקית
└── README.md
```

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js (גרסה 16 ומעלה)
- npm או yarn
- חשבון Supabase
- חשבון Google Cloud (אופציונלי, לאימות Google)

### הגדרת בסיס הנתונים

1. צרו חשבון ב-[Supabase](https://supabase.com/)
2. צרו פרויקט חדש
3. השיגו את URL ו-API Key של הפרויקט
4. צרו את הטבלאות הדרושות (ראו סעיף מבנה בסיס הנתונים)

### התקנת השרת

```bash
cd server
npm install
```

צרו קובץ `.env` בתיקיית השרת:

```env
DB_URL_SUPERBASE=your_supabase_url
DB_PUBLIC_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
```

הרצת השרת:
```bash
npm start
```
השרת יפעל על פורט 3004.

### התקנת הקליינט

```bash
cd client
npm install
```

עדכנו את ה-Google Client ID בקובץ `client/src/main.tsx`:
```tsx
<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
```

הרצת אפליקציית הקליינט:
```bash
npm run dev
```
האפליקציה תפעל על פורט 5173.

## 🚀 פריסה ל-Render (Deployment)

### הגדרות פריסה

הפרויקט מוכן לפריסה ב-Render עם הקובץ `render.yaml` הכלול בפרויקט.

#### שלבי פריסה:

1. **חבר את הפרויקט ל-Render**:
   - עלה את הפרויקט ל-GitHub
   - צור שירות חדש ב-Render
   - בחר את הרפוזיטורי שלך

2. **הגדר משתני סביבה ב-Render**:
   ```
   NODE_ENV=production
   DB_URL_SUPERBASE=your_supabase_url
   DB_PUBLIC_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=https://your-app-name.onrender.com
   ```

3. **פרטי פריסה**:
   - Build Command: `cd client && npm install && npm run build`
   - Start Command: `cd server && NODE_ENV=production npm start`
   - Environment: Node
   - Region: Oregon (US West) או קרוב לאזור שלכם

4. **לאחר פריסה**:
   - Render יבנה את הפרויקט אוטומטית
   - האפליקציה תהיה זמינה בכתובת שתוקצה לכם
   - השרת ישרת גם את ה-API וגם את הקליינט

### בעיות נפוצות בפריסה:

- **CORS Error**: השרת מוגדר לעבוד בסביבת production אוטומטית
- **Database Connection**: בדוק את פרטי החיבור ל-Supabase
- **Build Errors**: וודא שכל התלותים מותקנות נכון
- **Google OAuth**: עדכן את ה-Client ID בקובץ `client/src/main.tsx` לפני הפריסה

## 🗄️ מבנה בסיס הנתונים

### טבלאות נדרשות ב-Supabase:

#### users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(50) UNIQUE NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profileImg TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### posts
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  imageUrl TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### follows
```sql
CREATE TABLE follows (
  id SERIAL PRIMARY KEY,
  followerId INT REFERENCES users(id) ON DELETE CASCADE,
  followingId INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(followerId, followingId)
);
```

#### likes
```sql
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(id) ON DELETE CASCADE,
  postId INT REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(userId, postId)
);
```

#### comments
```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(id) ON DELETE CASCADE,
  postId INT REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔗 API Endpoints

### משתמשים
- `GET /user` - קבלת כל המשתמשים
- `GET /user/:id` - קבלת משתמש לפי ID
- `POST /user/add` - הרשמת משתמש חדש
- `POST /user/login` - התחברות משתמש

### פוסטים
- `GET /posts` - קבלת כל הפוסטים
- `GET /posts/:userId` - קבלת פוסטים של משתמש
- `POST /posts/add/:id` - יצירת פוסט חדש
- `PUT /posts/:id` - עדכון פוסט
- `DELETE /posts/:id` - מחיקת פוסט
- `GET /posts/feed/:userId` - פיד אישי

### עוקבים
- `POST /follows/follow` - עקיבה אחרי משתמש
- `DELETE /follows/unfollow/:followerId/:followingId` - הפסקת עקיבה
- `GET /follows/followers/count/:userId` - מספר עוקבים
- `GET /follows/following/count/:userId` - מספר נעקבים

### לייקים
- `POST /like/toggle` - הוספת/הסרת לייק
- `GET /like/count/:postId` - מספר לייקים לפוסט

### תגובות
- `GET /comments/:postId` - תגובות לפוסט
- `POST /comments/add` - הוספת תגובה
- `DELETE /comments/:id` - מחיקת תגובה

## 🔐 אבטחה

- **הצפנת סיסמאות**: כל הסיסמאות מוצפנות באמצעות bcrypt
- **JWT Tokens**: אימות משתמשים באמצעות JSON Web Tokens
- **CORS**: הגנה מפני בקשות לא מורשות
- **Validation**: ולידציה של נתונים בצד השרת

## 🎯 שימוש

1. **הרשמה**: צרו חשבון חדש עם שם משתמש, סיסמה ותמונת פרופיל
2. **התחברות**: התחברו עם פרטי הכניסה או Google OAuth
3. **יצירת תוכן**: פרסמו פוסטים עם תמונות ותיאורים
4. **אינטראקציות**: עקבו אחרי משתמשים, תנו לייקים ותגובות
5. **פרופיל**: נהלו את הפרופיל האישי שלכם

## 🤝 תרומה

מוזמנים לתרום לפרויקט! פתחו Issues או שלחו Pull Requests.

## 📄 רישיון

הפרויקט הזה הוא בקוד פתוח ונמצא תחת רישיון MIT.

## 📞 יצירת קשר

לשאלות או הצעות, אנא פתחו Issue בפרויקט או צרו קשר דרך GitHub.

---

**נוצר עם ❤️ בישראל**

