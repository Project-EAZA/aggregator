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
  teachings: Teaching[];
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

export interface GeneralEd {
  code: string;
  description: string;
}

export interface EthnicStudies {
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

export interface CourseAttributes {
  id: string;
  name: string;
  subject: Subject;
  courseNumber: string;
  generalEd?: GeneralEd;
  ethnicStudies?: EthnicStudies;
  breadths: Breadth[];
  levels: Level[];
}

export interface Id {
  $oid: string;
}

export interface Subject {
  name: string;
  abbreviation: string;
  code: string;
}

export interface Times {
  startTime: number;
  endTime: number;
}

export interface Days {
  days: string[];
}

export interface Schedule {
  times: Times;
  days: Days;
  uuid: string;
}

export interface Room {
  facilityCode: string;
  roomCode: string;
  uuid: string;
}

export interface Instructor {
  id: number;
  name: string;
}

export interface Grades {
  A: number;
  AB: number;
  NW: number;
  I: number;
  OTHER: number;
  D: number;
  S: number;
  CR: number;
  BC: number;
  N: number;
  NR: number;
  C: number;
  U: number;
  B: number;
  F: number;
  P: number;
}

export interface Section {
  termCode: number;
  courseNumber: number;
  sectionType: string;
  sectionNumber: number;
  schedule: Schedule;
  room: Room;
  instructors: Instructor[];
  grades: Grades;
}

export interface Teaching {
  termCode: number;
  subjects: Subject[];
  sections: Section[];
}

export interface CourseGrades {
  courseNumber: number;
  name: string;
  teachings: Teaching[];
}
