import React from "react";
import axios from "axios";
import ReactJson from "react-json-view";

class whether extends React.Component {
  constructor() {
      super();
      
    this.state = {
      city: "",
      result: {}
    };
  }

  setCityName = e => {
    axios
      .get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: this.state.city,
          appid: "fd4e7cfeeb1c6b08381b8be893c800b3"
        }
      })
      .then(res => {
        this.setState({
          result: res.data
        });
      })
        .catch(err => {
            this.setState({
                result: {
                 'city':"Not Found"
             }
         })
          
      });
    e.preventDefault();
  };

  onValueChanged = event => {
    this.setState({
      city: event.target.value
    });
    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment >
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <label className="nav-link">COMMO</label>
            </li>
          </ul>
        </nav>

        <div className="container">
          <div className="row justify-content-center align-items-center ">
            <div className="col-4 citypanel">
              <form>
                <div className="form-group">
                  <label htmlFor="email">Enter your City Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    value={this.state.city}
                    required
                    onChange={this.onValueChanged}
                  />
                </div>
                <button
                  type="submit"
                  onClick={this.setCityName}
                  className="btn btn-primary"
                >
                  CHECK
                </button>
              </form>
            </div>

            <div className="col-md-6">
              <div className="display">
                  <div className="col-md-8">
                    <label>Climatic Information </label>
                  {<ReactJson src={this.state.result} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default whether;
