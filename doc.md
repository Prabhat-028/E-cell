# Backend Request Contract (E-cell)

This file explains how the codebase expects requests to reach the backend and how data should be sent.

## 1) Global flow

- Base URL: all routers are mounted with `app.use("/", ...)`, so paths are exactly as written in route files.
- JSON body parsing is enabled globally with `express.json()`.
- Cookies are parsed globally with `cookie-parser`.
- CORS is enabled with:
    - `origin: process.env.ORIGIN`
    - `credentials: true`

## 2) Required client request setup

### For requests without files

- Send `Content-Type: application/json`
- Put payload in JSON body

Example:

```http
POST /form
Content-Type: application/json

{
  "fullName": "Aman Kumar",
  "mobileNo": 9876543210,
  "year": "3rd",
  "emailId": "aman@example.com",
  "studentType": "BTech",
  "branch": "CSE"
}
```

### For requests with image upload

Use `multipart/form-data` and exact field names below:

- Collaboration image: `collaborationImage`
- Core team member image: `memberImage`
- Upcoming event banner: `upcomingEventsBanner`

Important:

- When a route expects a file, send both file and non-file fields in the same `multipart/form-data` request.
- Do not send a separate JSON body for that same request.

Example (file + rest data together):

```bash
curl -X POST http://localhost:PORT/admin/create/collaborations \
  -H "Cookie: token=<jwt-cookie-value>" \
  -F "collaborationImage=@C:/path/to/logo.png" \
  -F "name=Partner Name" \
  -F "about=About collaboration"
```

How backend reads it:

- File comes in `req.files.<fieldName>[0]` (from multer).
- Rest data comes in `req.body` as form fields.

For booleans/numbers in multipart:

- Multipart values arrive as strings.
- Send `isActive` as `"true"` or `"false"`; Mongoose usually casts these values.

### For admin-protected routes

- Admin login sets cookie `token` (httpOnly).
- Protected routes read JWT from `req.cookies.token`.
- Client must include cookies in requests:
    - Browser/fetch: `credentials: "include"`
    - Axios: `withCredentials: true`

## 2.1) Quick rule to choose request format

- Use `application/json` if endpoint does not require file upload.
- Use `multipart/form-data` if endpoint requires image/file upload.

JSON example (rest data only):

```http
PATCH /admin/startup/67f1234567890abcde123456
Content-Type: application/json

{
  "startUpName": "New Name",
  "founder": "Founder Name",
  "about": "Updated description",
  "website": "https://example.com",
  "isActive": true
}
```

## 3) Auth behavior

- Login route: `POST /admin/login`
- Logout route: `POST /admin/logout`
- Protected routes use `adminAuth` middleware.
- If token missing/invalid, backend returns `401`.

## 4) Data model expectations

### User (`User` model)

Required fields:

- `fullName` (String)
- `mobileNo` (Number, route enforces 10 digits)
- `year` (String)
- `emailId` (String)
- `studentType` (String)
- `branch` (String)

### Admin (`Admin` model)

Required fields:

- `email` (String, unique)
- `password` (String)

Note:

- Password comparison is plain text in current code (`validatePassword` does direct equality).

### Startup (`StartUp` model)

Required:

- `startUpName` (String)
- `founder` (String)
- `about` (String)

Optional:

- `website` (String, default empty)
- `isActive` (Boolean, default true)

### Collaboration model

Required:

- `name` (String)
- `about` (String)

Set by backend on create:

- `photoUrl` from Cloudinary upload

### Core team model

Required:

- `photoUrl` (String)
- `fullName` (String)
- `designation` (String)
- `isActive` (Boolean)

### Event model

Fields used by routes:

- `photoUrl` (String)
- `scheduledDate` (Date)
- `eventName` (String)
- `speaker` (String)

## 5) Path and parameter expectations

- Most `:id`/`:_id` route params are passed to Mongoose `findById*` methods.
- Expect MongoDB ObjectId format in params.
- Invalid ids may result in `500` or `400` depending on route error handling.

## 6) Response shape conventions in this codebase

Common patterns used (not perfectly uniform):

- Success with data: `{ message, data }`
- List: `{ message, count, data }`
- Some startup routes use `{ success: true, data }`
- Errors usually: `{ message }` or `{ message, error }`

## 7) Route grouping docs

- User route log: see `user.doc.md`
- Admin route log: see `admin.doc.md`
