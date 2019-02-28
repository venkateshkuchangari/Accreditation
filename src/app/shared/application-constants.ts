export const _Question_Categories = {
  eCommerce: 1331,
  supply_Chain: 1332,
  nuclear_Pharmacy: 1333,
  compounding: 1334,
  business_Information: 1335,
  general: 1336,
  ownership: 1327,
  vpp: 1339  
};

export const _Question_Ids = {
  schematic_QuestionId: 1124,
  storefront_QuestionId: 1125
};

export const _Program_Type_Ids = {
  accreditation_order: 133,
  vpp: 134,
  dotpharmacy: 101,
  dmepos: 108,
  vawd: 106,
  vdip: 127,
  vipps: 107
};

export const _License_Types = {
  pharmacist: 18
};

export const _Input_Regex = {
  alpha_numeric_regex: "^[^\\s+$][a-zA-Z0-9_!/@.',+#$\\\\%^&*\\s-]+$",
  alpha_only_regex: "^[^\\s+$][a-zA-Z\\s]+$",
  alpha_numeric_single_regex: "^[^\\s+$][a-zA-Z0-9_!/@.',+#$\\\\%^&*\\s-]*$",
  alpha_only_single_regex:"^[^\\s+$][a-zA-Z\\s]*$",
  phone_number_regex: "(([+][0-9]{1,3})?[0-9]{3}([-])?[0-9]{3}([-])?[0-9]{4})",
  website_regex:
    "^(http://|https://)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-zA-Z0-9_!/@.?,=+#$\\\\%^&*\\s-]+)?$",
  number_input_regex: "([0-9]*)",
  eprofileid_regex: "([0-9]{3,7})",
  nine_number_regex: "([0-9]{9})",
  seven_number_regex: "([0-9]{7})",
  ten_number_regex: "([0-9]{10})",
  phone_extension_regex: "([0-9]{2,5})",
  zip_code_regex: "([0-9]{5}([-][0-9]{4})?)",
  cvv_regex:"^[0-9]{3,4}$"
};

export const _Application_StepIds = {
  facility_info_details: 0,
  facility_info_bhours: 1,
  facility_info_bquestions: 2,
  facility_info_pharmacyactivities: 3,
  facility_info_inspectionhistory: 4,
  facility_info_accreditationhistory: 5,
  facility_info_disciplinary_actions: 6,
  facility_contacts: 7,
  ownership_question: 8,
  ownership_details: 9,
  facility_licenses: 10,
  staff_licenses: 11,
  disciplinary_questions: 12,
  app_questions_general: 13,
  app_questions_supplychain: 14,
  app_questions_ecommerce: 15,
  app_questions_nuclearpharmacy: 16,
  app_questions_compounding: 17,
  choose_programs: 18,
  prog_questions_vpp: 19,
  prog_questions_dotpharmacy: 20,
  prog_questions_dmepos: 21,
  prog_questions_vawd: 22,
  prog_questions_vdip: 23,
  prog_questions_vipps: 24,
  prog_questions_state_inspection: 25,
  dummy_placeholder_1: 26,
  dummy_placeholder_2: 27,
  dummy_placeholder_3: 28,
  dummy_placeholder_4: 29,
  review: 30,
  payment: 31
};

export const _Facility_Info_TabIds = {
  info_details: 0,
  info_bhours: 1,
  info_bquestions: 2,
  info_pharmacyactivities: 3,
  info_inspectionhistory: 4,
  info_accreditationhistory: 5,
  info__disciplinary_actions: 6,
  info__disciplinary_questions: 7
};

export const _Application_Questions_TabIds = {
  questions_general: 0,
  questions_supplychain: 1,
  questions_ecommerce: 2,
  questions_nuclearpharmacy: 3,
  questions_compounding: 4
};

export const _Program_Questions_TabIds = {
  questions_vpp: 0,
  questions_dotpharmacy: 1,
  questions_dmepos: 2,
  questions_vawd: 3,
  questions_vdip: 4,
  questions_vipps: 5
};

export const _Question_Type_Constants = {
  text: 1700,
  check_box: 1701,
  radio: 1702,
  drop_down: 1703,
  file_upload: 1705,
  state_selection: 1707,
  custom_radio: 1708,
  multiple_selection:1709
};

export const _Menu_Group_Constrants = {
  dashboard_tiles: 1,
  user_menu: 2,
  eprofile_menu: 3,
  facility_info_tabs: 4,
  ownership_tabs: 5,
  application_dashboard: 6,
  facility_list: 7
};

export const _Menu_items = {
  my_facilities: 1,
  application: 2,
  account_details: 3,
  request_access: 4,
  ownership_change: 5,
  faqs_resources: 6,
  request_eprofile_id: 7,
  facility_info: 8,
  org_contact: 9,
  ownership: 10,
  facility_licenses: 11,
  staff_licenses: 12,
  org_applications: 13,
  org_documents: 14,
  org_details: 15,
  business_information: 16,
  pharmacy_activities: 17,
  inspection_history: 18,
  accreditation_history: 19,
  individual_owners: 20,
  company_owners: 21,
  inprogress_applications: 22,
  inreview_applications: 23,
  submitted_applications: 24,
  completed_applications: 25,
  cancelled_applications: 26,
  create_application: 27
};

export const _Dashboard_Menu_Constants = {
  my_facilities_tooltip:
    "Click here to view the details of the facilities associated with your account.",
  application_tooltip:
    "Click here to resume an application, create a new one, or view application history.",
  account_details_tooltip:
    "Click here to view your account's contact information.",
  request_access_tooltip:
    "Click here to request access to a new or existing facility, or if your facility needs an e-Profile ID number.",
  ownership_change_tooltip:
    "Click here to initiate an Ownership Change for your facility or facilities.",
  faq_resources_tooltip:
    "Click here to view Frequently Asked Questions and to access resources for your facilities."
};

export const _Dashboard_Menu_Tiles = [
  {
    icon: "account_balance",
    name: "My Facilities",
    url: ["myfacility", "_fac_accr4"],
    menu_access_id: _Menu_items.my_facilities,
    queryParams: { selection: "single" },
    toolTipText: _Dashboard_Menu_Constants.my_facilities_tooltip
  },
  {
    icon: "note_add",
    name: "Application",
    menu_access_id: _Menu_items.application,
    url: ["myapplications"],
    toolTipText: _Dashboard_Menu_Constants.application_tooltip
  },
  {
    icon: "person_add",
    name: "Facility e-Profile Requests",
    menu_access_id: _Menu_items.request_access,
    url: "request-access",
    toolTipText: _Dashboard_Menu_Constants.request_access_tooltip
  },
  {
    icon: "people_outline",
    name: "Ownership Change",
    menu_access_id: _Menu_items.ownership_change,
    url: "",
    toolTipText: _Dashboard_Menu_Constants.ownership_change_tooltip
  },
  {
    icon: "contact_support",
    name: "FAQs & Resources",
    menu_access_id: _Menu_items.faqs_resources,
    url: "",
    toolTipText: _Dashboard_Menu_Constants.faq_resources_tooltip
  }
];

export const _Document_Type_Ids = {
  schematic_document_id: 17,
  storefront_document_id: 73,
  application_document_id: 4,
  inspection_document_id: 4
};

export const _User_Drop_Down = [
  {
    icon: "perm_contact_calender",
    name: "User Details",
    menu_access_id: _Menu_items.account_details,
    url: "user-profile",
    toolTipText: _Dashboard_Menu_Constants.account_details_tooltip
  }
];

export const _Choose_Program_Constants = {
  programInfo: [
    {
      programId: 134,
      application_stepId: _Application_StepIds.prog_questions_vpp,
      programImage:
        "../../../../assets/images/VPP_logo 187x110 for website.png",
      programName: "VPP",
      programTooltip:
        " An inspection service and information sharing network that assists the boards and licensed pharmacies in nonresident licensure processes. Starting at $1,995."
    },
    {
      programId: 101,
      application_stepId: _Application_StepIds.prog_questions_dotpharmacy,
      programImage: "../../../../assets/images/dotpharmacy - 187x110.png",
      programName: "DotPharmacy",
      programTooltip:
        "A verification program that grants use of the .pharmacy domain to safe and legal websites. Starting at $975."
    },
    {
      programId: 108,
      application_stepId: _Application_StepIds.prog_questions_dmepos,
      programImage:
        "../../../../assets/images/DMEPOS - 187x110 for website.png",
      programName: "DMEPOS",
      programTooltip:
        "NABP’s Durable Medical Equipment, Prosthetics, Orthotics, and Supplies (DMEPOS) accreditation program for pharmacies. Approved by CMS. Three year accreditation total cost $3,625."
    },
    {
      programId: 106,
      application_stepId: _Application_StepIds.prog_questions_vawd,
      programImage: "../../../../assets/images/VAWD - 187x110 for website.png",
      programName: "VAWD",
      programTooltip:
        "The Verified-Accredited Wholesale Distributors^® (VAWD®^) accreditation is for facilities engaged in the act of wholesale drug distribution. Estimated three-year accreditation cost: $7,500. "
    },
    {
      programId: 127,
      application_stepId: _Application_StepIds.prog_questions_vdip,
      programImage: "../../../../assets/images/VDIP -187x110.png",
      programName: "VDIP",
      programTooltip:
        " The Verified-Accredited Device Integrity Program^® (VDIP®^) accreditation is for business entities that distribute diagnostic over-the-counter (OTC) medical devices that may be dispensed pursuant to a prescription. Starting at $5,000."
    },
    {
      programId: 107,
      application_stepId: _Application_StepIds.prog_questions_vipps,
      programImage: "../../../../assets/images/VIPPS_187x110 for website.png",
      programName: "VIPPS",
      programTooltip:
        "The Verified Internet Pharmacy Practice Sites (VIPPS) program accredits websites offering pharmacy services. VIPPS accreditation lets consumers know they are on a safe site, qualifies the site's participation in paid advertising on Google, Bing, and Yahoo! search engines, validates pharmacy service merchants, and helps the site qualify for certain pharmacy network. The applicant must already have or apply for .pharmacy verification at the same time. Fees are dependent on the type of pharmacy seeking accreditation. Starting at $5,000."
    }
    // {
    //   programId:136,
    //   application_stepId:_Application_StepIds.prog_questions_state_inspection,
    //   programImage: "../../../../assets/images/NABP-red-logo-white-background-187x100.png",
    //   programName: "StateInspection",
    //   programTooltip:"The State Inspection program is for facilities identified directly by NABP that require an inspection for a particular State Board of Pharmacy. Only select this option if you received communication from NABP directing you to apply for a State Inspection."
    // }
  ]
};

export const Program_Questions_VPP_Message = {
  vpp_message:
    "Your facility must be active for at least 30 days before submitting your application for VPP. We saved your application so you can start right where you left off."
};

export const Application_Confirm_Message = {
  validation1_message:
    "You must be completing all the above steps for each facility before going to Choose Programs section.Click 'Ok, Proceed' to continue to next facility",
  cart_delete_message:
    "Your application progress for this program will be gone.You cannnot undo these changes"
};

export interface LookUp {
  id: number;
  text: string;
  url?: string;
  regEx?: string;
}

export const Calendar_Months: LookUp[] = [
  {
    id: 1,
    text: "January"
  },
  {
    id: 2,
    text: "February"
  },
  {
    id: 3,
    text: "March"
  },
  {
    id: 4,
    text: "April"
  },
  {
    id: 5,
    text: "May"
  },
  {
    id: 6,
    text: "June"
  },
  {
    id: 7,
    text: "July"
  },
  {
    id: 8,
    text: "August"
  },
  {
    id: 9,
    text: "September"
  },
  {
    id: 10,
    text: "October"
  },
  {
    id: 11,
    text: "November"
  },
  {
    id: 12,
    text: "December"
  }
];

export const Payment_Type_Ids = {
  visa: 1,
  master: 2,
  amex: 3,
  check:4,
  payment_code:5
};

export const Payment_Types: LookUp[] = [
  {
    id: Payment_Type_Ids.visa,
    text: "Visa",
    url: "../../../assets/images/credit-card-logo/visa.png",
    regEx: "^(?:4[0-9]{12}(?:[0-9]{3})?)$"
  },
  {
    id: Payment_Type_Ids.master,
    text: "MasterCard",
    url: "../../../assets/images/credit-card-logo/mastercard.png",
    regEx: "^(?:5[1-5][0-9]{14})$"
  },
  {
    id: Payment_Type_Ids.amex,
    text: "Amex",
    url: "../../../assets/images/credit-card-logo/amex.png",
    regEx: "^(?:3[47][0-9]{13})$"
  }
];

export const _Payment_Confirmation_Message = `<p>&nbsp;"Thank you for submitting an application for the Verified Pharmacy Program&reg; (VPP&reg;). Your application is being processed. Please allow us approximately one to two weeks to review your application and materials. If any documentation or clarification is necessary, NABP will inform you.&nbsp;</p>
<p>Once an application is determined complete, your pharmacy will be placed in the inspection queue, and you may anticipate having an unannounced inspection at any point within approximately eight weeks. Please note, inspections occur based on the listed hours of operation you have provided in your application. This includes weekends.&nbsp;</p>
<p>Upon completion of an inspection, an applicant may expect to receive the final inspection report electronically within 30 calendar days; however, on average, this time frame is less. Time lines may vary depending on the state of original licensure, whether discipline has ever been imposed on a license(s), and the number of different nonresident pharmacy licenses an applicant currently holds.&nbsp;</p>
<p>For an explanation of the fee categories, please see the&nbsp;<b><a class="external-link" title="Follow link" href="https://www.nabp.pharmacy/programs/verified-pharmacy-program/apply/#fees" rel="nofollow">Fees page</a>&nbsp;</b>on the NABP website. If you have any questions, you may contact&nbsp;VPP&nbsp;at&nbsp;<b style="text-decoration: underline;" class="nobr"><a class="external-link" title="Follow link" href="mailto:vpp@nabp.pharmacy" rel="nofollow">vpp@nabp.pharmacy<sup><img class="rendericon" src="https://hd.nabp.net/images/icons/mail_small.gif" alt="" width="13" height="12" align="absmiddle" border="0" /></sup></a></b>&nbsp;or call 847/391-4406 Monday through Friday, 9 AM to 5 PM Central time."</p>`;
