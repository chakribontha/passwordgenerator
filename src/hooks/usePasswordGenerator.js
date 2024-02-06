import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const gerenatePassword = (checkboxesdata, length) => {
    if (!Array.isArray(checkboxesdata)) {
      setErrorMessage("Invalid data format");
      setPassword("");
      return;
    }

    let charset = "";
    let generatedPassword = "";

    const selectedOptions = checkboxesdata.filter((checked) => checked.status);

    if (selectedOptions.length === 0) {
      setErrorMessage("Select at least one option");
      setPassword("");
      return;
    }

    selectedOptions.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include lowercase":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Number":
          charset += "0123456789";
          break;
        case "Include symbols":
          charset += "!@#$%^&*()_+";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, errorMessage, gerenatePassword };
};

export default usePasswordGenerator;
