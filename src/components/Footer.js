import React, { Component } from "react";
import "../styles/Footer.css";
import twi from "../images/twitter.png";
import fb from "../images/facebook.png";
import vk from "../images/vk.png";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="share twitter">
          <a className="share-link" href="https://twitter.com/intent/tweet?text=Hello%20world">
            <img className="share_img" src={twi} alt="twit" />
            Твитнуть
          </a>
        </p>
        <p className="share fb">
          <a
            className="share-link"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
          >
            <img className="share_img" src={fb} alt="facebook" />
            Поделиться
          </a>
        </p>
        <p className="share vk">
          <a className="share-link" href="https://vk.com/share.php?url=http://mysite.com">
            <img className="share_img" src={vk} alt="vk" />
          </a>
        </p>
      </footer>
    );
  }
}
