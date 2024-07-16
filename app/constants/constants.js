import i1 from '@/app/assets/icon/user.svg'
export const GenderField = ["Male", "Female"];
export const Doctors = [
  {
    image: i1,
    name: "John Green",
  },
  {
    image: i1,
    name: "John Green2",
  },
  {
    image:i1,
    name: "John Green3",
  },
  {
    image: i1,
    name: "John Green4",
  },
  {
    image: i1,
    name: "John Green5",
  },

  {
    image: i1,
    name: "John Green6",
  },
  
];

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const PatientFormDefaultValues = {

  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male",
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};