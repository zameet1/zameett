# Zameett Supabase email setup

## Custom SMTP

In Supabase, open **Project Settings → Authentication → SMTP Settings** and enable custom SMTP.

- Sender email: `hello@zameett.com`
- Sender name: `Zameett`
- Host: `smtp.hostinger.com`
- Port: `465`
- Username: `hello@zameett.com`
- Password: enter the Hostinger mailbox password directly in Supabase

If port 465 is not accepted by the dashboard, use port `587`.

Never commit or share the mailbox password.

## Confirm-signup email

Open **Authentication → Email Templates → Confirm signup**.

- Subject: `Confirm your Zameett account`
- Body: paste the contents of `confirm-signup.html`

The template sends customers through `/auth/confirm`, which verifies the token and stores their session before taking them to the account page.