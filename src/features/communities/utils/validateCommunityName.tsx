export const validateCommunityName = (name: string) => {
  if (!name) return "Community name is required.";
  if (name.length < 3) return "Community name is too short.";

  const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (format.test(name))
    return "Community name cannot contain special characters.";
};
