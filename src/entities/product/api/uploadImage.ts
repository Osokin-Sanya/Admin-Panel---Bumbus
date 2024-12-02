import supabaseClient from "../../../shared/supabase-client/api/supabaseClient";

const handleUpload = async (imageFile: File) => {
  if (!imageFile) return;

  const fileName = `${Date.now()}_${imageFile.name}`;

  const { data, error } = await supabaseClient.storage
    .from("images")
    .upload(fileName, imageFile);

  if (error) {
    console.error("Loading error:", error.message);
  } else {
    console.log("The file is successfully uploaded:", data);
  }

  return fileName;
};

export default handleUpload;
