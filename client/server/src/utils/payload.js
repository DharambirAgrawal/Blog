export const ADMIN_PAYLOAD = (email) => {
  return {
    type: "JWT",
    email: email,
  };
};
