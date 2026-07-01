# How to check all tabs without the backend

The appointment system normally needs the Node/Express/Postgres backend running.
To review the UI and click through every tab BEFORE the backend is wired, use the
dev bypass.

## 1. Enable the dev bypass
Create a file named `.env.local` in the project root (same folder as package.json)
containing:

    VITE_DEV_LOGIN=true

Restart `npm run dev` after adding it.

## 2. Log in as a booker (Student / Faculty / Staff)
- Go to **Book Appointment** in the navbar -> pick Student, Faculty, or Staff.
- On the login page you'll see an orange **"Dev Login as ..."** button.
- Click it. You are logged in instantly with a fake user and taken to the
  shared appointments dashboard.
- Use the role toggle at the top of the login to try Student / Faculty / Staff.
- All three share the same dashboard; the title changes to match the role.

## 3. Check the manager dashboards (Counsellor / Administrator / Dean)
These have their own logins at:
- `/login/counsellor`
- `/login/administrator`
- `/login/dean`

The dev bypass button is only on the booker login. To preview the manager
dashboards without a backend, either:
- temporarily point those role logins at the same dev flow, or
- run the backend and use the seed accounts (see the backend README).

## 4. Turn it off for production
Delete `.env.local` or set `VITE_DEV_LOGIN=false`. The orange button disappears
and only real backend logins work.

## Notes
- Dev logins use a fake token; API calls that hit the real backend will fail
  until the backend is running. Booking/among tabs that call the API will show
  an error message, which is expected in bypass mode.
- The booker dashboard calls the shared `bookerAPI` endpoints
  (`/api/appointments...`). Make sure your backend exposes those for
  student, faculty, and staff.
