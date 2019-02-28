import { _Document_Type_Ids } from "src/app/shared/application-constants";

export class QuestionResponses {
  facilityId: number;
  childApplicationId: number;
  questionAnswerDataId?: any;
  questionAnswerDataText?: any;
  questionAnswerDataList: any[];
}

export class QuestionDataList {
  applicationQuestionDataId: number;
  applicationQuestionDatakey:string;
  applicationQuestionDataValue: string;
}

export class OwnershipQuestion {
  questionId: number;
  type: string;
  questionTypeId: number;
  questionDisplaySequence: number;
  questionText: string;
  isResponseRequired: boolean;
  isQuestionActive: boolean;
  isDeleted: boolean;
  questionResponses: QuestionResponses;
  answer: Answer;
  isCommonQuestion: boolean;
  questionDataList: QuestionDataList[];
  displayRuleForChildQuestions: any[];
  childQuestionIds: any[];
  parentValue: any;
  display = false;
}

export class Answer {
  questionAnswerDataId: number;
  questionAnswerDataText: string;
  questionAnswerDataList: string[];
  questionAnswerDataIdList:number[]; 
  questionId: number;
  fileMetaDatas:FileMetaDatas[]
  states:number[]  
}

export class FileMetaDatas{
  fileId: string;
  fileName: string;
  documentTypeId: number
  constructor(){    
    this.documentTypeId=_Document_Type_Ids.application_document_id
  }
}


export class SaveQuestion {
  answerRequests: Answer[]; 
}


