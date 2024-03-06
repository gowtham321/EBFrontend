const baseURL = "https://localhost:7139";

export async function login(email, password) {
  const res = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const data = await res.json();
    if (window) {
      sessionStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  }
  return res.status;
}

export function logout() {
  if (window) {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export async function requestNewToken(rfToken) {
  const res = await fetch(`${baseURL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: rfToken,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    if (window) {
      sessionStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  }
  return res.status;
}

export async function fetcher(params) {
  if (window) {
    let res = null;
    let accessToken = sessionStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    if (params.method == "GET") {
      res = await fetch(`${baseURL}/${params.endPoint}`, {
        method: params.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      res = await fetch(`${baseURL}/${params.endPoint}`, {
        method: params.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(params.body),
      });
    }

    return res;
  }
}
