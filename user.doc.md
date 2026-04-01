# User Routes Log

This file documents public/user-facing endpoints.

## 1) User form submit

- Method: `POST`
- Path: `/form`
- Auth: Not required
- Content-Type: `application/json`

Expected body:

```json
{
    "fullName": "Aman Kumar",
    "mobileNo": 9876543210,
    "year": "3rd",
    "emailId": "aman@example.com",
    "studentType": "BTech",
    "branch": "CSE"
}
```

Validation from route/model:

- `mobileNo` must be 10 digits (route-level check)
- All fields above are required by schema

Success response:

- `200` -> `{ "message": "Form Submitted Successfully." }`

Error responses:

- `400` invalid mobile
- `500` server error

---

## 2) Get active core team members

- Method: `GET`
- Path: `/member/coreTeam`
- Auth: Not required

Response:

- `200` -> `{ message, data: [coreTeam] }`

---

## 3) Get past members

- Method: `GET`
- Path: `/pastMembers`
- Auth: Not required

Response:

- `200` -> `{ message, data: [] }` when empty
- `200` -> `{ message, data: [coreTeam] }` when found

---

## 4) Get collaborations list (public)

- Method: `GET`
- Path: `/collaborations`
- Auth: Not required

Response:

- `200` -> `{ message, count, data }` when records exist
- `200` -> `{ message: "NO Collaborations Found" }` when empty

---

## 5) Get startup list (public)

- Method: `GET`
- Path: `/startup`
- Auth: Not required

Response:

- `200` -> `{ success: true, count, data }`

---

## 6) Get upcoming events (public)

- Method: `GET`
- Path: `/event/upcomingEvent`
- Auth: Not required

Response:

- `200` -> `{ message, count, data }`

---

## 7) Get successful/past events (public)

- Method: `GET`
- Path: `/event/successfullEvent`
- Auth: Not required

Response:

- `200` -> `{ message, count, data }`

## Notes

- All paths are mounted at `/` in app config.
- No pagination/query filters are implemented in these user-facing list endpoints.
