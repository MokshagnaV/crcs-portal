function formDataToJSON(formData) {
  const regData = {};
  for (const v of formData) {
    regData[v[0]] = v[1];
  }
  return regData;
}

export default formDataToJSON;
