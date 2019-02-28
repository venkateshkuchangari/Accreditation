import {
  _Application_StepIds,
  _Program_Type_Ids
} from "src/app/shared/application-constants";

export class ApplicationFlowSteps {
  stepId: number;
  stepName: string;
  optional: boolean;
  isdependent: boolean;
}

export class ApplicationFlowTabs {
  name: string;
  sequenceId: number;
  completionId: number;
  isValid: boolean;
  isCompleted: boolean;
}

export const applicationFlowStepsData: ApplicationFlowSteps[] = [
  {
    stepId: _Application_StepIds.facility_info_details,
    stepName: "facility-info-details",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.facility_info_bhours,
    stepName: "facility-info-bhours",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.facility_info_bquestions,
    stepName: "facility-info-bquestions",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.facility_info_pharmacyactivities,
    stepName: "facility-info-pharmacyactivities",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.facility_info_inspectionhistory,
    stepName: "facility-info-inspectionhistory",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.facility_info_accreditationhistory,
    stepName: "facility-info-accreditationhistory",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.facility_info_disciplinary_actions,
    stepName: "facility-info-inspectionhistory",
    optional: true,
    isdependent: false
  },  
  {
    stepId: _Application_StepIds.facility_contacts,
    stepName: "facility-contacts",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.ownership_question,
    stepName: "ownership-question",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.ownership_details,
    stepName: "ownership-details",
    optional: false,
    isdependent: true
  },
  {
    stepId: _Application_StepIds.facility_licenses,
    stepName: "facility-licenses",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.staff_licenses,
    stepName: "staff-licenses",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.disciplinary_questions,
    stepName: "accreditation-history",
    optional: true,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.app_questions_general,
    stepName: "app-questions-general",
    optional: false,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.app_questions_supplychain,
    stepName: "app-questions-supplychain",
    optional: false,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.app_questions_ecommerce,
    stepName: "app-questions-ecommerce",
    optional: false,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.app_questions_nuclearpharmacy,
    stepName: "app-questions-nuclearpharmacy",
    optional: false,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.app_questions_compounding,
    stepName: "app-questions-compounding",
    optional: false,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.choose_programs,
    stepName: "choose-programs",
    optional: false,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.prog_questions_vpp,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true,
  },
  {
    stepId: _Application_StepIds.prog_questions_dotpharmacy,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true
  },
  {
    stepId: _Application_StepIds.prog_questions_dmepos,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true
  },
  {
    stepId: _Application_StepIds.prog_questions_vawd,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true
  },
  {
    stepId: _Application_StepIds.prog_questions_vdip,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true,
  },
  {
    stepId: _Application_StepIds.prog_questions_vipps,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true,
  },
  {
    stepId: _Application_StepIds.prog_questions_state_inspection,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true,
  },
  {
    stepId: _Application_StepIds.dummy_placeholder_1,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true,
  },
  {
    stepId: _Application_StepIds.dummy_placeholder_2,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true
  },
  {
    stepId: _Application_StepIds.dummy_placeholder_3,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true,
  },
  {
    stepId: _Application_StepIds.dummy_placeholder_4,
    stepName: "Vpp-questions",
    optional: true,
    isdependent: true,
  },
  {
    stepId: _Application_StepIds.review,
    stepName: "review",
    optional: false,
    isdependent: false
  },
  {
    stepId: _Application_StepIds.payment,
    stepName: "payment",
    optional: true,
    isdependent: false
  }
];

export const applicationFlowTabs: ApplicationFlowTabs[] = [
  {
    name: "Facility Info",
    sequenceId: _Application_StepIds.facility_info_details,
    completionId: _Application_StepIds.facility_contacts,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Contacts",
    sequenceId: _Application_StepIds.facility_contacts,
    completionId: _Application_StepIds.ownership_question,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Ownership",
    sequenceId: _Application_StepIds.ownership_question,
    completionId: _Application_StepIds.facility_licenses,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Facility Licenses",
    sequenceId: _Application_StepIds.facility_licenses,
    completionId: _Application_StepIds.staff_licenses,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Staff Licenses",
    sequenceId: _Application_StepIds.staff_licenses,
    completionId: _Application_StepIds.disciplinary_questions,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Disciplinary Questions",
    sequenceId: _Application_StepIds.disciplinary_questions,
    completionId: _Application_StepIds.app_questions_general,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Application Questions",
    sequenceId: _Application_StepIds.app_questions_general,
    completionId: _Application_StepIds.choose_programs,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Choose Programs",
    sequenceId: _Application_StepIds.choose_programs,
    completionId: _Application_StepIds.prog_questions_vpp,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Program Questions",
    sequenceId: _Application_StepIds.prog_questions_vpp,
    completionId: _Application_StepIds.review,
    isValid: false,
    isCompleted: false
  },
  {
    name: "Review",
    sequenceId: _Application_StepIds.review,
    completionId: _Application_StepIds.payment,
    isValid: false,
    isCompleted: false
  }
];

export class ApplicationStepData {
  parentApplicationId: number;
  facilityId: number;
  sectionId: number;
  isValid: boolean;
  inProgress: boolean;
  isAttempted: boolean;
}


