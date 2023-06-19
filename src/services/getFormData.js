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
