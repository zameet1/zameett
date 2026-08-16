import "server-only";

// Deployment staging replaces this empty fallback with server-only VAPID values.
// Local development and platforms with environment support continue using process.env.
export const embeddedVapidConfig = Object.freeze({
  publicKey: "",
  privateKey: "",
  subject: "",
});
