// contactDetails.ts

interface ContactDetails {
  email?: string;
  phoneNumber?: string;
  linkedin?: string;
  instagram?: String;
  facebook?: string;
  location?: string;
}
interface companyDetails {
  GSTN?: string;
  FSSAI?: string;
}
export const contactDetails: ContactDetails = {
  email: "mrpglobaltraders2004@gmail.com",
  phoneNumber: "+919356380766",
  linkedin: "https://www.linkedin.com/in/prashant-uyyalwar-0a9639387/",
  instagram: "https://www.linkedin.com/in/prashant-uyyalwar-0a9639387/",
  facebook: "https://www.linkedin.com/in/prashant-uyyalwar-0a9639387/",
  location: "MRP Global Traders , chennai , India",
};

export const companyDetails: companyDetails = {
  GSTN: "33AMRPU3577D1ZM",
  FSSAI: "12425998000439",
};
