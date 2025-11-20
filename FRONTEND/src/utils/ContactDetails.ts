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
  linkedin: "#",
  instagram: "#",
  facebook: "#",
  location: "MRP Global Traders , chennai , India",
};

export const companyDetails: companyDetails = {
  GSTN: "33AMRPU3577D1ZM",
  FSSAI: "12425998000439",
};
