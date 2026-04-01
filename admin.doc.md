# Admin Routes Log

This file documents admin authentication and admin-protected endpoints.

## Auth routes

### 1) Admin login

- Method: `POST`
- Path: `/admin/login`
- Auth: Not required
- Content-Type: `application/json`

Expected body:

```json
{
    "email": "admin@example.com",
    "password": "admin123"
}
```

Behavior:

- Validates email/password against admin collection
- On success sets httpOnly cookie `token`
- Also returns token in response body

Response:

- `200` -> `{ "message": "Login successful", "data": "<jwt>" }`
- `401` invalid credentials

### 2) Admin logout

- Method: `POST`
- Path: `/admin/logout`
- Auth: Not required by middleware
- Clears cookie `token`

Response:

- `200` -> `{ "message": "Logged out successfully" }`

## Protected route requirements

For all protected routes below:

- Middleware: `adminAuth`
- JWT must be present in cookie `token`
- Client must send cookies with credentials enabled

## Request body format expectations

### A) Endpoints with image/file upload

- Content-Type must be `multipart/form-data`
- File and rest fields must be sent in the same form-data request
- Backend reads:
    - file from `req.files` (multer `upload.fields`)
    - non-file data from `req.body`

Example (`/admin/coreteam/addNewMember`):

```bash
curl -X POST http://localhost:PORT/admin/coreteam/addNewMember \
  -H "Cookie: token=<jwt-cookie-value>" \
  -F "memberImage=@C:/path/to/member.jpg" \
  -F "fullName=John Doe" \
  -F "designation=Lead" \
  -F "isActive=true"
```

### B) Endpoints without upload

- Content-Type must be `application/json`
- Send all rest data in JSON body

Example (`/admin/startup` create):

```http
POST /admin/startup
Content-Type: application/json

{
  "startUpName": "My Startup",
  "founder": "Founder Name",
  "about": "What we do",
  "website": "https://example.com",
  "isActive": true
}
```

Note on multipart field types:

- Form-data values arrive as strings; booleans like `isActive` should be sent as `"true"` or `"false"`.

---

## Collaboration management

### 3) List collaborations (admin)

- `GET /admin/collaborations`

### 4) Get one collaboration

- `GET /admin/collaborations/:id`

### 5) Create collaboration

- `POST /admin/create/collaborations`
- Content-Type: `multipart/form-data`
- File field: `collaborationImage`
- Body fields: `name`, `about`

### 6) Update collaboration

- `PATCH /admin/collaborations/:id`
- Content-Type: `application/json`
- Body: any updatable fields (`name`, `about`, etc.)

### 7) Delete collaboration

- `DELETE /admin/collaborations/:id`

---

## Core team management

### 8) List all members

- `GET /admin/coreTeam/members`

### 9) Add new member

- `POST /admin/coreteam/addNewMember`
- Content-Type: `multipart/form-data`
- File field: `memberImage`
- Body fields: `fullName`, `designation`, `isActive`

### 10) Update member

- `PATCH /admin/coreteam/:_id`
- Content-Type: `application/json`
- Required in current route logic: `fullName`, `designation`, `isActive`

Important note:

- Route checks `if (!fullName || !designation || !isActive)`.
- This rejects `isActive: false` as missing because `false` is falsy.

### 11) Delete member

- `DELETE /admin/coreteam/delete/:_id`

---

## Startup management

### 12) Create startup

- `POST /admin/startup`
- Content-Type: `application/json`
- Expected fields from model: `startUpName`, `founder`, `about`, optional `website`, optional `isActive`

### 13) List startups

- `GET /admin/startup`

### 14) Get startup by id

- `GET /admin/startup/:id`

### 15) Update startup

- `PUT /admin/startup/:id`
- Body: fields to update

### 16) Delete startup

- `DELETE /admin/startup/:id`

---

## Event management

### 17) Create upcoming event

- `POST /admin/upcomingevent`
- Content-Type: `multipart/form-data`
- File field: `upcomingEventsBanner`
- Body fields: `scheduledDate`, `eventName`, `speaker`

### 18) Update upcoming event

- `PATCH /admin/upcomingevent/:_id`
- Content-Type: `application/json`
- Body fields used: `scheduledDate`, `eventName`, `speaker`

### 19) Get event calendar (future events)

- `GET /admin/eventCalendar`

## Notes

- Signup route exists in source but currently commented out.
- Some routes return `200`, some return `201` for empty states or create/update; response style is not fully uniform.
