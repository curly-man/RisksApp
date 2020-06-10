import Requests from '../../Requests';

class RisksService {
  constructor(user) {
    this.url = `https://5ed40247fffad10016056a25.mockapi.io/users/${user.id}/risks`;
    this.http = new Requests();
  }

  getRisks() {
    return this.http.get(this.url);
  }

  addRisk(risk) {
    return this.http.post(this.url, risk);
  }

  updateRisk(risk) {
    return this.http.put(`${this.url}/${risk.id}`, risk);
  }

  removeRisk(riskID) {
    return this.http.delete(`${this.url}/${riskID}`);
  }
}

export default RisksService;
