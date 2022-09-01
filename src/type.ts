export interface APIResponse {
  found: number;
  hits: Array<Course>;
  message: string;
  success: boolean;
}

export interface Course {
  termCode: string;
  courseId: string;
  subject: Subject;
  catalogNumber: string;
  approvedForTopics: boolean;
  topics: any[];
  minimumCredits: number;
  maximumCredits: number;
  creditRange: string;
  firstTaught: string;
  lastTaught: string;
  typicallyOffered: string;
  generalEd?: any;
  ethnicStudies?: any;
  breadths: Breadth[];
  lettersAndScienceCredits: LettersAndScienceCredits;
  workplaceExperience?: any;
  foreignLanguage?: any;
  honors?: any;
  levels: Level[];
  openToFirstYear: boolean;
  advisoryPrerequisites?: any;
  enrollmentPrerequisites: string;
  allCrossListedSubjects: any[];
  title: string;
  description: string;
  catalogPrintFlag: boolean;
  academicGroupCode?: any;
  currentlyTaught: boolean;
  gradingBasis: GradingBasis;
  repeatable: string;
  gradCourseWork?: any;
  sustainability?: any;
  instructorProvidedContent?: any;
  courseRequirements: CourseRequirements;
  courseDesignation: string;
  courseDesignationRaw: string;
  fullCourseDesignation: string;
  fullCourseDesignationRaw: string;
  lastUpdated: number;
  catalogSort: string;
  subjectAggregate: string;
  titleSuggest: TitleSuggest;
  matched_queries?: any;
}

export interface SchoolCollege {
  academicOrgCode: string;
  academicGroupCode: string;
  shortDescription: string;
  formalDescription: string;
  uddsCode?: any;
  schoolCollegeURI: string;
}

export interface Subject {
  termCode: string;
  subjectCode: string;
  description: string;
  shortDescription: string;
  formalDescription: string;
  undergraduateCatalogURI: string;
  graduateCatalogURI: string;
  departmentURI: string;
  uddsFundingSource: string;
  schoolCollege: SchoolCollege;
  footnotes: string[];
  departmentOwnerAcademicOrgCode: string;
}

export interface Breadth {
  code: string;
  description: string;
}

export interface LettersAndScienceCredits {
  code: string;
  description: string;
}

export interface Level {
  code: string;
  description: string;
}

export interface GradingBasis {
  code: string;
  description: string;
}

export type CourseRequirements = Record<string, Array<number>>;

export interface Payload {
  courseId: string;
}

export interface TitleSuggest {
  input: string[];
  payload: Payload;
}
