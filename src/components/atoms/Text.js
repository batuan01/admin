export const TextRequired = ({ children }) => {
  return (
    <p className="flex items-center gap-2">
      <span className="text-[#FF6868]  text-2xl">*</span>
      {children}
    </p>
  );
};

export const RandomTextGenerator = ({ length }) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomText = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
};

export function limitText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}
