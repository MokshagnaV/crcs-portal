import dataSet from "../../dummydataset.json";
import mscs from "../../mscs.json";

const actualData = dataSet;

export function getAnnualReturnsData() {
  return mscs;
}

export function getData() {
  return actualData;
}

export function getDataOfYear(year) {
  return actualData.filter(
    (d) => new Date(d["Date of Registration"]).getFullYear() === year
  );
}

export function societiesCountAccToStates(data = actualData) {
  const states = Array.from(new Set(data.map((d) => d.State)));
  const societiesCount = new Array(states.length).fill(0);

  states.forEach((state, i) => {
    data.forEach((d) => {
      if (d.State === state) societiesCount[i]++;
    });
  });
  const res = {};
  for (let i = 0; i < states.length; i++) {
    res[states[i]] = societiesCount[i];
  }
  res.type = "States";
  return res;
}

export function societiesCountAccToDistrict(state, data) {
  const societiesOfState = data.filter((d) => d.State === state);
  const districts = Array.from(
    new Set(societiesOfState.map((d) => d.District))
  );

  const societiesCount = new Array(districts.length).fill(0);

  districts.forEach((district, i) => {
    data.forEach((d) => {
      if (d.District === district) societiesCount[i]++;
    });
  });
  const res = {};
  for (let i = 0; i < districts.length; i++) {
    res[districts[i]] = societiesCount[i];
  }
  res.type = `${state} districts`;
  return Object.keys(res).length > 1 ? res : null;
}

export function societiesCountAccToSector(data = actualData) {
  const sectors = Array.from(new Set(data.map((d) => d["Sector Type"])));
  const societiesCount = new Array(sectors.length).fill(0);

  sectors.forEach((sector, i) => {
    data.forEach((d) => {
      if (d["Sector Type"] === sector) societiesCount[i]++;
    });
  });
  const res = {};
  for (let i = 0; i < sectors.length; i++) {
    res[sectors[i]] = societiesCount[i];
  }
  res.type = "Sector";
  return res;
}

export function stateCountAccToSector(sector, data) {
  const societiesOfSector = data.filter((d) => d["Sector Type"] === sector);
  const states = Array.from(new Set(societiesOfSector.map((d) => d.State)));
  const societiesCount = new Array(states.length).fill(0);

  states.forEach((state, i) => {
    societiesOfSector.forEach((d) => {
      if (d.State === state) societiesCount[i]++;
    });
  });
  const res = {};
  for (let i = 0; i < states.length; i++) {
    res[states[i]] = societiesCount[i];
  }
  res.type = `${sector}`;
  return Object.keys(res).length > 1 ? res : null;
}

export function noOfRegPerYear() {
  const years = Array.from(
    new Set(
      actualData.map((d) => {
        return new Date(d["Date of Registration"]).getFullYear();
      })
    )
  );
  const societiesCount = new Array(years.length).fill(0);
  years.forEach((y, i) => {
    actualData.forEach((d) => {
      if (new Date(d["Date of Registration"]).getFullYear() === y)
        societiesCount[i]++;
    });
  });

  const res = {};
  for (let i = 0; i < years.length; i++) {
    res[years[i]] = societiesCount[i];
  }
  return res;
}
