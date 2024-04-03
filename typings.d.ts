type MCQQuestion = {
  question: string;
  options: string[];
  marks: number;
};

type GroupBQuestion = {
  question: string;
  marks: number;
};

type ExamQuestions = {
  MCQ: MCQQuestion[];
  GroupB: GroupBQuestion[];
  GroupC: GroupBQuestion[]; // Assuming GroupC and GroupD have the same structure as GroupB
  GroupD: GroupBQuestion[];
  GroupE: GroupBQuestion[];
};

type QuestionData = MCQQuestion[] | GroupBQuestion[];

type Paper = {
  id: number;
  created_at: string;
  user_email: string;
  data: string;
  paper_name: string;
};
type Question = {
  id: number;
  created_at: string;
  user_email: string;
  question: string;
  marks: number;
  options?: string;
  answer?: string;
  paper_name: string;
  type?: string;
};
