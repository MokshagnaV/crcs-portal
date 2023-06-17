import dataSet from "../../dummydataset.json";

const data = dataSet;

export function socitiesCountAccToStates() {
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
  return res;
}

export function socitiesCountAccToSector() {
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
  return res;
}

export function noOfRegPerYear() {
  const years = Array.from(
    new Set(
      data.map((d) => {
        return new Date(d["Date of Registration"]).getFullYear();
      })
    )
  );

  const socitiesCount = new Array(years.length).fill(0);
  years.forEach((y, i) => {
    data.forEach((d) => {
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
