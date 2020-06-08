class Requests {
  async request(url, methodType, data) {
    const response = await fetch(
      url,
      {
        method: methodType,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      },
    );
    return response.json();
  }

  async get(url) {
    return this.request(url, 'GET');
  }

  async post(url, data) {
    return this.request(url, 'POST', data);
  }

  async put(url, data) {
    return this.request(url, 'PUT', data);
  }

  async delete(url) {
    return this.request(url, 'DELETE');
  }
}

export default Requests;
