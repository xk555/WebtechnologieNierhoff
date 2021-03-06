import React from "react";
import Button from "@material-ui/core/Button";
import ShareIcon from "./../../Pictures/share.png";
import LogoIcon from "./../../Pictures/Logo.png";
import StarBorder from "@material-ui/icons/StarBorder";
import "./StyledButton.css";

/**
 * Gives you the standardlayout of PidVid buttons
 * @param onClick Has onClick for the onClick function of the buttons
 * @param text Has text which is used to render the text onto the button.
 */
export function NormalButton(props) {
  return (
    <Button onClick={props.onClick} className="normalButton">
      {props.text}
    </Button>
  );
}

export class TreeButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.onClick = props.onClick;
    this.text = props.text;
  }
  render() {
    return (
      <Button onClick={e => this.onClick(this.id)} className="normalButton">
        {this.text}
      </Button>
    );
  }
}

/**
 * Gives you the standardlayout of PidVid exit buttons
 * @param onClick Has onClick for the onClick exit function
 */
export function ExitButton(props) {
  return (
    <Button variant="outlined" onClick={props.onClick} className="charButton">
      X
    </Button>
  );
}
/**
 * Gives you the standardlayout of PidVid exit buttons
 * @param onClick Has onClick for the onClick exit function
 */
export function AddButton(props) {
  return (
    <Button variant="outlined" onClick={props.onClick} className="charButton">
      <StarBorder />
    </Button>
  );
}
export function StartButton(props) {
  return (
    <Button onClick={props.onClick} className="startButton">
      {props.text}
    </Button>
  );
}
/**
 * Gives you the PidVid Logo as a Button
 * @param onClick Has onClick for the onClick ToStartPage Class
 */
export function LogoButton(props) {
  return (
    <Button onClick={props.onClick}>
      <img src={LogoIcon} alt="logo" width="140px" />
    </Button>
  );
}
/**
 * Gives you a ShareButton in PidVid Green
 * @param onClick Has onClick for the onClick to function
 */
export function ShareButton(props) {
  return (
    <Button onClick={props.onClick} id="shareButton">
      <img src={ShareIcon} alt="ShareButton" width="30px" />
    </Button>
  );
}
