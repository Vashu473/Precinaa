const baseUrl = "http://localhost/";
async function httpGetPlanets() {
  const response = await fetch(`${baseUrl}planet`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${baseUrl}launch`);
  let launchData = await response.json();
  return launchData.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${baseUrl}launch`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${baseUrl}launch/${id}`, {
      method: "delete",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
