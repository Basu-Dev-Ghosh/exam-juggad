export async function getQuestions(file: FileList) {
  console.log();

  console.log(file);

  try {
    const formData = new FormData();
    formData.append("files", file[0]);

    const response = await fetch(
      "https://exam-juggad-server.onrender.com/uploadpdf/",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      const questions = await response.json();
      return questions;
    }
  } catch (error) {
    console.error("Error fetching PDF texts:", error);
    return {
      error: "Error fetching PDF texts",
    };
  }
}
export async function getSuggestions(files: any) {
  console.log(files);

  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await fetch(
      "https://exam-juggad-server.onrender.com/ai-suggestion/",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      const suggestions = await response.json();
      console.log(suggestions);

      return suggestions;
    }
  } catch (error) {
    console.error("Error fetching PDF texts:", error);
    return {
      error: "Error fetching PDF texts",
    };
  }
}
