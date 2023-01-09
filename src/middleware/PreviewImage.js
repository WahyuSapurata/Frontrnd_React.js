import { useState } from "react";

export default function PreviewImage({ file }) {
  const [preview, setPreview] = useState({});
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <div>
      <img style={{ width: "200px", marginTop: "10px" }} src={preview} alt="" />
    </div>
  );
}
