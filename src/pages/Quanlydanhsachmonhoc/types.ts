// Định nghĩa các enums
export enum DifficultyLevel {
  EASY = 'Dễ',
  MEDIUM = 'Trung bình',
  HARD = 'Khó',
  VERY_HARD = 'Rất khó'
}

// Định nghĩa các interfaces
export interface Subject {
  id: string;
  code: string; // Mã môn học
  name: string; // Tên môn học
  credits: number; // Số tín chỉ
  knowledgeBlocks: KnowledgeBlock[]; // Các khối kiến thức
}

export interface KnowledgeBlock {
  id: string;
  name: string; // Tên khối kiến thức
  subjectId: string; // ID môn học
  description?: string; // Mô tả (không bắt buộc)
}

export interface Question {
  id: string;
  code: string; // Mã câu hỏi
  subjectId: string; // ID môn học
  knowledgeBlockId: string; // ID khối kiến thức
  content: string; // Nội dung câu hỏi
  difficulty: DifficultyLevel; // Mức độ khó
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamStructure {
  id: string;
  name: string; // Tên cấu trúc đề
  subjectId: string; // ID môn học
  requirements: ExamRequirement[]; // Yêu cầu về số lượng câu hỏi
  createdAt: Date;
}

export interface ExamRequirement {
  knowledgeBlockId: string; // ID khối kiến thức
  difficulty: DifficultyLevel; // Mức độ khó
  numberOfQuestions: number; // Số lượng câu hỏi
}

export interface Exam {
  id: string;
  name: string; // Tên đề thi
  subjectId: string; // ID môn học
  structureId: string; // ID cấu trúc đề
  questions: Question[]; // Danh sách câu hỏi
  createdAt: Date;
  updatedAt: Date;
}

// Định nghĩa các types cho filters
export interface QuestionFilters {
  subjectId?: string;
  knowledgeBlockId?: string;
  difficulty?: DifficultyLevel;
  searchText?: string;
}

export interface ExamFilters {
  subjectId?: string;
  fromDate?: Date;
  toDate?: Date;
  searchText?: string;
} 