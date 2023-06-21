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

export function socitiesCountAccToStates(data = actualData) {
  const states = Array.from(new Set(data.map((d) => d.State)));
  const socitiesCount = new Array(states.length).fill(0);

  states.forEach((state, i) => {
    data.forEach((d) => {
      if (d.State === state) socitiesCount[i]++;
    });
  });
  const res = {};
  for (let i = 0; i < states.length; i++) {
    res[states[i]] = socitiesCount[i];
  }
  res.type = "States";
  return res;
}

export function socitiesCountAccToDistrict(state, data) {
  const socitiesOfState = data.filter((d) => d.State === state);
  const districts = Array.from(new Set(socitiesOfState.map((d) => d.District)));

  const socitiesCount = new Array(districts.length).fill(0);

  districts.forEach((district, i) => {
    data.forEach((d) => {
      if (d.District === district) socitiesCount[i]++;
    });
  });
  const res = {};
  for (let i = 0; i < districts.length; i++) {
    res[districts[i]] = socitiesCount[i];
  }
  res.type = `${state} districts`;
  return Object.keys(res).length > 1 ? res : null;
}

export function socitiesCountAccToSector(data = actualData) {
  const sectors = Array.from(new Set(data.map((d) => d["Sector Type"])));
  const socitiesCount = new Array(sectors.length).fill(0);

  sectors.forEach((sector, i) => {
    data.forEach((d) => {
      if (d["Sector Type"] === sector) socitiesCount[i]++;
    });
  });
  const res = {};
  for (let i = 0; i < sectors.length; i++) {
    res[sectors[i]] = socitiesCount[i];
  }
  res.type = "Sector";
  return res;
}

export function stateCountAccToSector(sector, data) {
  const socitiesOfSector = data.filter((d) => d["Sector Type"] === sector);
  const states = Array.from(new Set(socitiesOfSector.map((d) => d.State)));
  const socitiesCount = new Array(states.length).fill(0);

  states.forEach((state, i) => {
    socitiesOfSector.forEach((d) => {
      if (d.State === state) socitiesCount[i]++;
    });
  });
  const res = {};
  for (let i = 0; i < states.length; i++) {
    res[states[i]] = socitiesCount[i];
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
  const socitiesCount = new Array(years.length).fill(0);
  years.forEach((y, i) => {
    actualData.forEach((d) => {
      if (new Date(d["Date of Registration"]).getFullYear() === y)
        socitiesCount[i]++;
    });
  });

  const res = {};
  for (let i = 0; i < years.length; i++) {
    res[years[i]] = socitiesCount[i];
  }
  return res;
}
