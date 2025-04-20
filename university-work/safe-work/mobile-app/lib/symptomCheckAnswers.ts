import { create } from 'zustand';

interface SymptomAnswers {
  [question: string]: boolean | null;
}

interface SymptomStore {
  answers: SymptomAnswers;
  setAnswer: (question: string, answer: boolean) => void;
  clearAnswers: () => void;
}

const useSymptomAnswers = create<SymptomStore>((set) => ({
  answers: {},
  setAnswer: (question, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [question]: answer,
      },
    })),
  clearAnswers: () => set({ answers: {} }),
}));

export default useSymptomAnswers;