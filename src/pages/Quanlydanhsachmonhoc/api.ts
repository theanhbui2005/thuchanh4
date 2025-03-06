import { request } from 'umi';
import type {
  Subject,
  KnowledgeBlock,
  Question,
  ExamStructure,
  Exam,
  QuestionFilters,
  ExamFilters,
} from '@/pages/QuanLyDeThi/types';

const BASE_URL = '/api';

// API quản lý môn học
export async function getSubjects() {
  return request<Subject[]>(`${BASE_URL}/subjects`);
}

export async function createSubject(subject: Omit<Subject, 'id'>) {
  return request<Subject>(`${BASE_URL}/subjects`, {
    method: 'POST',
    data: subject,
  });
}

export async function updateSubject(id: string, subject: Partial<Subject>) {
  return request<Subject>(`${BASE_URL}/subjects/${id}`, {
    method: 'PUT',
    data: subject,
  });
}

export async function deleteSubject(id: string) {
  return request(`${BASE_URL}/subjects/${id}`, {
    method: 'DELETE',
  });
}

// API quản lý khối kiến thức
export async function getKnowledgeBlocks(subjectId: string) {
  return request<KnowledgeBlock[]>(`/api/knowledge-blocks?subjectId=${subjectId}`);
}

export async function createKnowledgeBlock(knowledgeBlock: Omit<KnowledgeBlock, 'id'>) {
  return request<KnowledgeBlock>(`${BASE_URL}/knowledge-blocks`, {
    method: 'POST',
    data: knowledgeBlock,
  });
}

// API quản lý câu hỏi
export async function getQuestions(filters: QuestionFilters) {
  return request<Question[]>(`${BASE_URL}/questions`, {
    params: filters,
  });
}

export async function createQuestion(question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) {
  return request<Question>(`${BASE_URL}/questions`, {
    method: 'POST',
    data: question,
  });
}

export async function updateQuestion(id: string, question: Partial<Question>) {
  return request<Question>(`${BASE_URL}/questions/${id}`, {
    method: 'PUT',
    data: question,
  });
}

export async function deleteQuestion(id: string) {
  return request(`${BASE_URL}/questions/${id}`, {
    method: 'DELETE',
  });
}

// API quản lý cấu trúc đề thi
export async function getExamStructures(subjectId: string) {
  return request<ExamStructure[]>(`${BASE_URL}/subjects/${subjectId}/exam-structures`);
}

export async function createExamStructure(examStructure: Omit<ExamStructure, 'id' | 'createdAt'>) {
  return request<ExamStructure>(`${BASE_URL}/exam-structures`, {
    method: 'POST',
    data: examStructure,
  });
}

// API quản lý đề thi
export async function getExams(filters: ExamFilters) {
  return request<Exam[]>(`${BASE_URL}/exams`, {
    params: filters,
  });
}

export async function createExam(structureId: string, name: string) {
  return request<Exam>(`${BASE_URL}/exams/generate`, {
    method: 'POST',
    data: {
      structureId,
      name,
    },
  });
}

export async function getExamById(id: string) {
  return request<Exam>(`${BASE_URL}/exams/${id}`);
}