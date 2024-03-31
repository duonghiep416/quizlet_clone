interface IFilter {
  order?: string;
  sort?: string;
  limit?: number;
  page?: number;
  status?: string;
  role?: string;
  q?: string;
}
const get = async (url: string, filter: IFilter) => {
  const stringifiedFilter: Record<string, string> = {};

  for (const key in filter) {
    if (filter[key as keyof IFilter] !== undefined) {
      stringifiedFilter[key] = String(filter[key as keyof IFilter]);
    }
  }

  const params = new URLSearchParams(stringifiedFilter).toString();
  const response = await fetch(`${url}?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const getWithToken = async (url: string, accessToken: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

const postWithToken = async (url: string, accessToken: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const putWithToken = async (url: string, accessToken: string, data: any) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const patchWithToken = async (url: string, accessToken: string, data: any) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const deleteWithToken = async (url: string, accessToken: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

export {
  get,
  getWithToken,
  postWithToken,
  putWithToken,
  patchWithToken,
  deleteWithToken,
};
