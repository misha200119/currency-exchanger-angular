// this adresses of API that i found, so difficult find smth free
// everywhere requires key that i take after registration and i have
// only 100 requests
const APIKey = 'bc7251f168c2401d97e9f4201e162005';
const basePath = 'https://openexchangerates.org/api/latest.json?app_id=';

// unlim queries from that api
const altFreeBasePath = 'https://api.exchangerate.host/latest?base=';

// path to API that calculate how much i take if change,
// but i think right desicion - is calculate all in app side
// and don't send requests when i user new value
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '55a1a0bba4msh25ebe2075ef0a8ep1e0aa8jsnfa67b1504c53',
		'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
	}
};
const basePathToCalcEchangeAPI = 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency';

export const getLatestCourseBasedOnUSD = async () =>{
  const response = await fetch(altFreeBasePath + 'USD');
  return response.json();
}

export const getCalculatedCurrency = async (have: string, want: string, amount: number) => {
  const generatedPath = `${basePathToCalcEchangeAPI}?have=${have}&want=${want}&amount=${amount}`;
  const response = await fetch(generatedPath, options);

  return response.json();
}

