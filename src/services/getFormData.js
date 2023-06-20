import httpServices from "../services/httpService";
import config from "../config.json";

export function formDataToJSON(formData) {
  const regData = {};
  for (const v of formData) {
    regData[v[0]] = v[1];
  }
  return regData;
}

export async function getStates() {
  const { data: states } = await httpServices.get(
    config.apiEndPoint + "states/"
  );
  return states;
}

export async function getDistricts(state) {
  const { data: districts } = await httpServices.get(
    `${config.apiEndPoint}districts/?state=${state}`
  );
  return districts;
}

export function getSectors() {
  return [
    "Construction",
    "Agro",
    "Consumer",
    "Cooperative Bank",
    "Credit",
    "Dairy",
    "Export",
    "Federation",
    "Fisheries",
    "Health/Hospital",
    "Housing",
    "Industrial/Textile",
    "Labour",
    "Marketing",
    "Multi Purpose",
    "National Federation",
    "Organic",
    "Others",
    "Seed",
    "Technical",
    "Tourism",
    "Transport",
    "Welfare",
  ];
}

export function getDummyStates() {
  return [
    "ANDAMAN AND NICOBAR",
    "ANDHRA PRADESH ",
    "ARUNACHAL PRADESH",
    "ASSAM",
    "BIHAR",
    "CHANDIGARH",
    "CHHATTISGARH",
    "DADRA AND NAGAR HAVELI",
    "DAMAN AND DIU",
    "GOA",
    "GUJARAT",
    "HARYANA",
    "HIMACHAL PRADESH",
    "JAMMU AND KASHMIR",
    "JHARKHAND",
    "KARNATAKA",
    "KERALA",
    "LAKSHADWEEP",
    "MADHYA PRADESH",
    "MAHARASHTRA",
    "MANIPUR",
    "MEGHALAYA",
    "MIZORAM",
    "NAGALAND",
    "NEW DELHI",
    "ODISHA",
    "PONDICHERRY",
    "PUNJAB",
    "RAJASTHAN",
    "SIKKIM",
    "TAMIL NADU",
    "TELANGANA",
    "TRIPURA",
    "UTTAR PRADESH",
    "UTTARAKHAND",
    "WEST BENGAL",
  ];
}
