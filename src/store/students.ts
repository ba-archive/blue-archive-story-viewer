import { defineStore } from 'pinia';
import { Student } from '../types/Student';

export const useStudentStore = defineStore({
  id: 'student',
  state: () => {
    return {
      students: [] as Student[],
    };
  },
  persist: false,
  getters: {
    getAllStudents: state => {
      return state.students;
    },
    getStudentById: state => (id: number) => {
      return state.students.find(student => student.id === id);
    },
  },
  actions: {
    setStudents(students: Student[]) {
      this.students = students;
    },
  },
});
