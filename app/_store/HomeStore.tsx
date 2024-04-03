import { create } from "zustand";
import { supabase } from "../_config/supabase.config";

interface HomeState {
  screen: string;
  changeScreen: (screen: string) => void;
  background: string;
  changeBackground: (bg: string) => void;
  currentQuestion: ExamQuestions | { error: string } | null;
  changeCurrentQuestion: (
    question: ExamQuestions | { error: string } | null
  ) => void;
  questionUploading: boolean;
  setQuestionUploading: (uploading: boolean) => void;
  saveCurrentQuestionToDB: (questionData: any) => Promise<void>;
  saveQuestionToDB: (questionData: any) => Promise<void>;
  papers: any;
  getPapers: (user_email: string | null | undefined) => Promise<void>;

  currentQuestionPaperName: string;
  setCurrentQuestionPaperName: (name: string) => void;
  questions: any;
  getQuestions: (user_email: string | null | undefined) => Promise<void>;
  updateAnswer: (id: number, answer: string) => void;
  createNewSuggestion: (
    name: string,
    email: string | null | undefined,
    data?: ExamQuestions
  ) => Promise<string | null>;
  suggestions: { name: string; id: string }[] | [];
  getSuggestions: (
    email: string | null | undefined
  ) => Promise<null | undefined>;
  saveQuestionToSuggestion: (
    questionData: Question,
    suggestionId: string
  ) => Promise<void>;
}

export const useHomeStore = create<HomeState>()((set) => ({
  screen: "home",
  changeScreen: (screen) => set((state) => ({ screen: screen })),
  background: "/bg/bg1.jpg",
  changeBackground: (bg) => set((state) => ({ background: bg })),
  currentQuestion: null,
  changeCurrentQuestion: (question: ExamQuestions | { error: string } | null) =>
    set((state) => ({ currentQuestion: question })),
  questionUploading: false,
  setQuestionUploading: (uploading) =>
    set((state) => ({ questionUploading: uploading })),
  saveCurrentQuestionToDB: async (questionData: any) => {
    const { data, error } = await supabase
      .from("papers")
      .insert([questionData])
      .select();
    if (error) {
      console.log(error);
    }
    // console.log(data);
  },
  saveQuestionToDB: async (questionData: any) => {
    const { data, error } = await supabase
      .from("questions")
      .insert([questionData])
      .select();
    if (error) {
      console.log(error);
    }
    console.log(data);
  },
  papers: null,
  getPapers: async (user_email: string | null | undefined) => {
    if (!user_email) return;
    const { data, error } = await supabase
      .from("papers")
      .select()
      .eq("user_email", user_email);
    if (error) {
      console.log(error);
    }
    set((state) => ({ papers: data }));
  },
  currentQuestionPaperName: "",
  setCurrentQuestionPaperName: (name) =>
    set((state) => ({ currentQuestionPaperName: name })),
  questions: null,
  getQuestions: async (user_email: string | null | undefined) => {
    if (!user_email) return;
    const { data, error } = await supabase
      .from("questions")
      .select()
      .eq("user_email", user_email);
    if (error) {
      console.log(error);
    }
    set((state) => ({ questions: data }));
  },
  updateAnswer: async (id, answer) => {
    const { data, error } = await supabase
      .from("questions")
      .update({ answer: answer })
      .eq("id", id);
    if (error) {
      console.log(error);
    }
    set((state) => {
      const questions = state.questions.map((question: any) => {
        if (question.id === id) {
          question.answer = answer;
        }
        return question;
      });
      return { questions: questions };
    });
  },
  suggestions: [],
  createNewSuggestion: async (
    name: string,
    email: string | null | undefined,
    suggestionData?: ExamQuestions
  ) => {
    if (!email) return null;
    const { data, error } = await supabase
      .from("suggestions")
      .insert([
        {
          name: name,
          user_email: email,
          data: suggestionData ? JSON.stringify(suggestionData) : null,
        },
      ])
      .select("id,name");
    if (error) {
      console.log(error);
    }
    console.log(data);
    if (data) {
      let sugg: { id: string; name: string } = data[0];
      set((state) => {
        let suggestions = state.suggestions;
        suggestions = [...suggestions, sugg];
        return { suggestions: suggestions };
      });
    }
    if (data) return data[0].id;
    else return null;
  },
  getSuggestions: async (email: string | null | undefined) => {
    if (!email) return null;
    console.log(email);

    const { data, error } = await supabase
      .from("suggestions")
      .select("id,name,data,created_at")
      .eq("user_email", email);

    if (error) {
      console.log(error);
    }
    if (data) {
      set(() => ({ suggestions: data }));
    } else {
      set(() => ({ suggestions: [] }));
    }
  },
  saveQuestionToSuggestion: async (
    questionData: Question,
    suggestionId: string
  ) => {
    let questionType =
      questionData.type || questionData.options ? "MCQ" : "GroupB";

    const { data, error } = await supabase
      .from("suggestion_questions")
      .insert([
        {
          question: questionData.question,
          answer: questionData.answer,
          type: questionType,
          suggestion_id: suggestionId,
          options: questionData.options || null,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    }
    console.log(data);
  },
}));
