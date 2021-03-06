import React from "react";
import "./Login.css";
import { NormalButton } from "./../StyledButton/StyledButton";
import LogoIcon from "../../Pictures/Logo.png";
import SearchBar from "../StyledInput/StyledInput.jsx";
import { domain, login } from "../../server";

//Settings
const thisDomain = "." + domain; //die domain des clients mit führendem " "."

/*
The Login Component can be used everywhere on the Page.
It has a width and a height prop that are passed to css.
*/
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      width: this.props.width === undefined ? "min-content" : this.props.width,
      height: this.props.height,
      status: "ready",
      returnToStartPage: false
    };
    this.submit = this.submit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.toStartPage = props.actionToStart;
  }

  submit = () => {
    fetch(login, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ name: this.state.user, pass: this.state.pass })
    })
      .then(response => {
        return response.text();
      })
      .then(response => {
        if (response !== "Nope") {
          document.cookie = "token=" + JSON.parse(response).token + ";";
          document.cookie = "path=/;";
          document.cookie = "domain=" + thisDomain + ";";
          document.cookie = "user=" + this.state.user + ";";
          document.cookie = "group=" + JSON.parse(response).group + ";";
          this.setState({
            status: "loading"
          });
        } else {
          this.setState({
            status: "false"
          });
        }
      });
    this.getAll();
  };

  getAll() {
    var cookieList = document.cookie ? document.cookie.split(";") : [];
    var cookieValues = {};
    for (var i = 0, n = cookieList.length; i !== n; ++i) {
      var cookie = cookieList[i];
      var f = cookie.indexOf("=");
      if (f >= 0) {
        var cookieName = cookie.substring(0, f);
        var cookieValue = cookie.substring(f + 1);
        if (!cookieValues.hasOwnProperty(cookieName)) {
          cookieValues[cookieName] = cookieValue;
        }
      }
    }
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangePass(e) {
    this.setState({
      pass: e.target.value
    });
  }

  render() {
    let statusObject = undefined;
    if (this.state.status === "false") {
      statusObject = (
        <div className="false">
          Bitte Benutzername und Passwort eingeben. Beide Felder berücksichtigen
          die Groß-/Kleinschreibung.
        </div>
      );
    }
    if (this.state.status === "loading") {
      statusObject = <div>Success...</div>;
      this.toStartPage();
    }
    return (
      <div className={"FullPageLogin"}>
        <img src={LogoIcon} className="logoInMain" alt="logo" width="40%" />
        <div
          style={{ width: this.state.width, height: this.state.height }}
          className={"Login"}
        >
          <div className={"LoginInner"}>
            {statusObject}
            <SearchBar
              onChange={this.onChangeUser}
              placeholder={"User name..."}
            />
            <SearchBar
              onChange={this.onChangePass}
              placeholder={"Password..."}
              inputProps={{ type: "password" }}
              onKeyDown={e => {
                if (e.key === "Enter") this.submit();
              }}
            />
            <NormalButton
              text="login"
              className={"FormItem"}
              onClick={this.submit}
            />
          </div>
        </div>
      </div>
    );
  }
}
