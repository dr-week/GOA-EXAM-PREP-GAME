export interface TranslationDict {
  appTitle: string;
  subtitle: string;
  launchTest: string;
  startPractice: string;
  officialExamArena: string;
  subjectStudio: string;
  timeRemaining: string;
  submitExam: string;
  question: string;
  explanation: string;
  previous: string;
  next: string;
}

export const translations: Record<string, TranslationDict> = {
  en: {
    appTitle: 'Goa Exam Master',
    subtitle: 'GPSC, GSSC, LDC & State Prep Studio',
    launchTest: 'Launch Official Test (100 Qs)',
    startPractice: 'Start Practice Drill',
    officialExamArena: 'Official 100-Question Exam Arena',
    subjectStudio: 'Subject Practice Studio',
    timeRemaining: 'Time Remaining',
    submitExam: 'Submit Exam',
    question: 'Question',
    explanation: 'Explanation',
    previous: 'Previous',
    next: 'Next Question',
  },
  gom: {
    appTitle: 'गोंय परीक्षा मास्तर',
    subtitle: 'जीपीएससी आनी जीएसएससी तयारी स्टुडिओ',
    launchTest: 'अधिकृत परीक्षा सुरू करा (१०० प्रश्न)',
    startPractice: 'सराव सुरू करा',
    officialExamArena: 'अधिकृत १००-प्रश्न परीक्षा हॉल',
    subjectStudio: 'विषय सराव स्टुडिओ',
    timeRemaining: 'उरिल्लो वेळ',
    submitExam: 'परीक्षा जमा करा',
    question: 'प्रश्न',
    explanation: 'स्पष्टीकरण',
    previous: 'फाटीं',
    next: 'फुडलो प्रश्न',
  },
  mr: {
    appTitle: 'गोवा परीक्षा मास्टर',
    subtitle: 'जीपीएससी आणि जीएसएससी तयारी स्टुडिओ',
    launchTest: 'अधिकृत परीक्षा सुरू करा (१०० प्रश्न)',
    startPractice: 'सराव सुरू करा',
    officialExamArena: 'अधिकृत १००-प्रश्न परीक्षा हॉल',
    subjectStudio: 'विषय सराव स्टुडिओ',
    timeRemaining: 'उरलेला वेळ',
    submitExam: 'परीक्षा सबमिट करा',
    question: 'प्रश्न',
    explanation: 'स्पष्टीकरण',
    previous: 'मागे',
    next: 'पुढील प्रश्न',
  },
};
