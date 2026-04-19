"use client"

export const useLogin = () => {
  const loginWithGoogle = () => {
    console.log("Logging in with Google...");
    // Future: Integration with @ously/auth
  };

  const loginWithGithub = () => {
    console.log("Logging in with GitHub...");
    // Future: Integration with @ously/auth
  };

  return {
    loginWithGoogle,
    loginWithGithub,
  };
};
