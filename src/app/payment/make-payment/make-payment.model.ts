import { _Program_Type_Ids } from "src/app/shared/application-constants";

export class BillToAddress {
  AddressId: number;
  AddressLine1: string;
  AddressLine2?: any;
  City: string;
  State: string;
  StateCode?: any;
  StateId: number;
  StateName?: any;
  ZipOrPostalCode: string;
  CountryId: number;
  CountryName?: any;
  CountryCode?: any;
  IsAddressValidated: boolean;
}

export class PaymentAdditionalDetails {
  PaymentPhoneNumber: string;
}

export class Payment {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  PaymentTypeId: number;
  AccountNumber: string;
  ExpirationMonth: number;
  ExpirationYear: number;
  Cvv: number;
  AccountNumberLast4?: any;
  BillToAddressId: number;
  BillToAddress: BillToAddress;
  PaymentAdditionalDetails: PaymentAdditionalDetails;
  constructor() {
    this.BillToAddress = new BillToAddress();
    this.PaymentAdditionalDetails = new PaymentAdditionalDetails();
  }
}

export class PaymentDiscountCodeUsage {
  paymentDiscountCodeUsageId: number;
  paymentDiscountCodeTypeId: number;
  paymentDiscountCodeName: string;
  paymentDiscountPercentage: number;
  paymentDiscountAmount: number;
  paymentDiscountUsedForApplicationId: number; 
}

export class Item {
  applicationId: number;
  facilityId: number;
  applicationProgramTypeId: number;
  price: number;
  discountedPrice: number;
  isPaymentCodeApplied: boolean;
  paymentDiscountCode: string;
  militaryPersonalType: number;
  itemTotal: number;
  itemIdList: ItemList[];
}


export class OrderLineItem {
  item: Item;
  quantity: number;
  constructor() {
    this.item = new Item();
  }
}

export interface ApplicationCartItem {
  facilityId: number;
  itemIds:ItemList[];
  applicationId: number;
  programTypeId: number;
  applicationFee: number;
  programType: string;
  legalBusinessName: string;
  discountedApplicationFee:number;
  primaryDBA: string;
  eProfileID: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateID: number;
  stateName: string;
  countryID: number;
  countryName: string;
}

export interface ItemList{
  itemId: number;
  discountedPrice: number;
}

export interface CartObject {
  applicationFeeDetails:ApplicationCartItem[];
  totalFee:number;
  parentApplicationId:number;
  discountedTotalFee:number;
  discountCodeUsage:PaymentDiscountCodeUsage
}

export interface PaymentFormObject {
  firstName: string;
  middleName: string;
  lastName: string;
  creditCardType: number;
  creditCardNumber: string;
  expirationMonth: number;
  expirationYear: number;
  cardCvv: number;
  cardPhoneNumber: string;
  billingAddress1: string;
  billingAddress2: string;
  billingCity: string;
  billingCountry: number;
  billingState: string;
  billingZipCode: string;
}

export class PaymentObject {
  applicationId: number;
  applicationProgramTypeId: number;
  entityId: number;
  userLoginId: number;
  userName: string;
  Payment: Payment;
  paymentDiscountCodeUsage: PaymentDiscountCodeUsage;
  orderLineItems: OrderLineItem[];
  balanceDue: number;
  isMobile: boolean;
  billingOrganizationId: number;
  constructor() {
    this.Payment = new Payment();       
    this.orderLineItems = [];
    this.isMobile = false;
    this.applicationProgramTypeId = _Program_Type_Ids.accreditation_order;
  }
}

export interface PaymentResponse {
  paymentRefNo: string;
  statusCode: number;
  message: string;
  transactionStatus: string;
}




