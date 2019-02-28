import { NgModule } from "@angular/core";
import { AppMaterialModule } from "./appmaterial.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from "@angular/material";
import { DynamicGridComponent } from "./dynamic-grid/dynamic-grid.component";
import { ChiplistinputComponent } from "./chiplistinput/chiplistinput.component";
import { AgGridModule } from "ag-grid-angular";
import { MyFacilityListComponent } from "../myfacility/facility-list/myfacility-list.component";
import { RouterModule } from "@angular/router";
import { PhonenumberPipe } from "./phonenumber.pipe";
import { MyFacilityOwnershipComponent } from "../myfacility/facility-profile/ownership/myfacility-ownership.component";
import { FacilityLicenseComponent } from "../myfacility/facility-profile/facility-license/facility-license.component";
import { MyFacilityInfoComponent } from "../myfacility/facility-profile/facility-info/myfacility-info.component";
import { DetailsTabModalComponent } from "../myfacility/facility-profile/facility-info/details-tab/details-tab-modal/details-tab-modal.component";
import { InfoDetailtabComponent } from "../myfacility/facility-profile/facility-info/details-tab/details-tab.component";
import { InfoBusinessHoursComponent } from "../myfacility/facility-profile/facility-info/businesshours/info-businesshours.component";
import { PharmacyactivitiesComponent } from "../myfacility/facility-profile/facility-info/pharmacyactivities-tab/pharmacyactivities.component";
import { BusinessHoursModalComponent } from "../myfacility/facility-profile/facility-info/businesshours/businesshours-modal/businesshours-modal.component";
import { InspectionComponent } from "../myfacility/facility-profile/facility-info/inspection/inspection.component";
import { MyFacilityContactsComponent } from "../myfacility/facility-profile/facility-contacts/myfacility-contacts.component";
import { AccreditationComponent } from "../myfacility/facility-profile/facility-info/accreditation/accreditation.component";
import { InspectionModalComponent } from "../myfacility/facility-profile/facility-info/inspection/inspection-modal/inspection-modal.component";
import { PharmacyactivitiesModalComponent } from "../myfacility/facility-profile/facility-info/pharmacyactivities-tab/pharmacyactivities-modal/pharmacyactivities-modal.component";
import { StaffLicenseComponent } from "../myfacility/facility-profile/staff-license/staff-license.component";
import { StaffLicenseModalComponent } from "../myfacility/facility-profile/staff-license/staff-license-modal/staff-license-modal.component";
import { QuestionsGeneralComponent } from "../myapplication/application-process/application-questions/questions-general/questions-general.component";
import { QuestionsSupplyChainComponent } from "../myapplication/application-process/application-questions/questions-supply-chain/questions-supply-chain.component";
import { QuestionsEcommerceComponent } from "../myapplication/application-process/application-questions/questions-ecommerce/questions-ecommerce.component";
import { QuestionsNuclearPharmacyComponent } from "../myapplication/application-process/application-questions/questions-nuclear-pharmacy/questions-nuclear-pharmacy.component";
import { QuestionsCompoundingComponent } from "../myapplication/application-process/application-questions/questions-compounding/questions-compounding.component";
import { AccreditationModalComponent } from "../myfacility/facility-profile/facility-info/accreditation/accreditation-modal/accreditation-modal.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { IndividualOwnershipComponent } from "../myfacility/facility-profile/ownership/individual-ownership/individual-ownership.component";
import { CompanyOwnershipComponent } from "../myfacility/facility-profile/ownership/company-ownership/company-ownership.component";
import { IndividualOwnershipModalComponent } from "../myfacility/facility-profile/ownership/individual-ownership/individual-ownership-modal/individual-ownership-modal.component";
import { CompanyOwnershipModalComponent } from "../myfacility/facility-profile/ownership/company-ownership/company-ownership-modal/company-ownership-modal.component";
import { FacilityLicenseModalComponent } from "../myfacility/facility-profile/facility-license/facility-license-modal/facility-license-modal.component";
import { BusinessQuestionComponent } from "../myapplication/application-process/business-question/business-question.component";
import { DisciplinaryActionComponent } from "../myfacility/facility-profile/facility-info/disciplinary-action/disciplinary-action.component";

const component = [
  DynamicGridComponent,
  ChiplistinputComponent,
  MyFacilityListComponent,
  PhonenumberPipe,
  MyFacilityInfoComponent,
  MyFacilityOwnershipComponent,
  FacilityLicenseComponent,
  DetailsTabModalComponent,
  InfoDetailtabComponent,
  InfoBusinessHoursComponent,
  PharmacyactivitiesComponent,
  BusinessHoursModalComponent,
  BusinessQuestionComponent,
  InspectionComponent,
  InspectionModalComponent,
  MyFacilityContactsComponent,
  AccreditationComponent,
  FacilityLicenseComponent,
  PharmacyactivitiesModalComponent,
  StaffLicenseComponent,
  StaffLicenseModalComponent,
  QuestionsGeneralComponent,
  QuestionsSupplyChainComponent,
  QuestionsEcommerceComponent,
  QuestionsNuclearPharmacyComponent,
  QuestionsCompoundingComponent,
  DynamicFormComponent,
  FileUploadComponent,
  AccreditationModalComponent,
  IndividualOwnershipComponent,
  CompanyOwnershipComponent,
  CompanyOwnershipModalComponent,
  FacilityLicenseModalComponent,
  IndividualOwnershipModalComponent,
  DisciplinaryActionComponent
];

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    FormsModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule
  ],
  declarations: [...component],
  exports: [AppMaterialModule, PhonenumberPipe, RouterModule, ...component],
  entryComponents: [
    DetailsTabModalComponent,
    BusinessHoursModalComponent,
    InspectionModalComponent,
    PharmacyactivitiesModalComponent,
    AccreditationModalComponent,
    StaffLicenseModalComponent,
    CompanyOwnershipModalComponent,
    IndividualOwnershipModalComponent,
    FacilityLicenseModalComponent
  ],
  providers: [DatePipe,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class SharedModule {}
