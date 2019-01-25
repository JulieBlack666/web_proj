import React, { Component } from "react";
import "../styles/Footer.css";
import {
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
  VKShareButton,
  VKIcon,
  OKShareButton,
  OKIcon
} from "react-share";

export default class Footer extends Component {
  shareLink = "http://github.com";
  title = "Check this out!";

  render() {
    return (
      <footer className="footer">
        <div className="footer__share-link">
          <TwitterShareButton
            url={this.shareLink}
            title={this.title}
            className="footer__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div className="footer__share-link">
          <FacebookShareButton
            url={this.shareUrl}
            quote={this.title}
            className="footer__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <FacebookShareCount url={this.shareUrl} className="footer__share-count">
            {count => count}
          </FacebookShareCount>
        </div>

        <div className="footer__share-link">
          <GooglePlusShareButton
            url={this.shareLink}
            title={this.title}
            className="footer__share-button"
          >
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </div>

        <div className="footer__share-link">
          <VKShareButton url={this.shareLink} title={this.title} className="footer__share-button">
            <VKIcon size={32} round />
          </VKShareButton>
        </div>

        <div className="footer__share-link">
          <LinkedinShareButton
            url={this.shareLink}
            title={this.title}
            className="footer__share-button"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>

        <div className="footer__share-link">
          <OKShareButton url={this.shareLink} title={this.title} className="footer__share-button">
            <OKIcon size={32} round />
          </OKShareButton>
        </div>

        <div className="footer__share-link">
          <TelegramShareButton
            url={this.shareLink}
            title={this.title}
            className="footer__share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>
      </footer>
    );
  }
}
