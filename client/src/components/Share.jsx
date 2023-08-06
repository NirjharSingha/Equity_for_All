import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import React, { useEffect } from "react";
import "./Share.css";

const Share = () => {
  useEffect(() => {
    console.log("share component loaded");
  }, []);

  return (
    <div className="shareComponent">
      <EmailShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <EmailIcon className="shareOptionIcon" /> <span>Email</span>
      </EmailShareButton>
      <FacebookShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <FacebookIcon className="shareOptionIcon" /> <span>Facebook</span>
      </FacebookShareButton>
      <FacebookMessengerShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <FacebookMessengerIcon className="shareOptionIcon" />{" "}
        <span>Messenger</span>
      </FacebookMessengerShareButton>
      <HatenaShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <HatenaIcon className="shareOptionIcon" /> <span>Hatena</span>
      </HatenaShareButton>
      <InstapaperShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <InstapaperIcon className="shareOptionIcon" /> <span>Instapaper</span>
      </InstapaperShareButton>
      <LineShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <LineIcon className="shareOptionIcon" /> <span>Line</span>
      </LineShareButton>
      <LinkedinShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <LinkedinIcon className="shareOptionIcon" /> <span>Linkedin</span>
      </LinkedinShareButton>
      <LivejournalShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <LivejournalIcon className="shareOptionIcon" /> <span>Livejournal</span>
      </LivejournalShareButton>
      <MailruShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <MailruIcon className="shareOptionIcon" /> <span>Mailru</span>
      </MailruShareButton>
      <OKShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <OKIcon className="shareOptionIcon" /> <span>OK</span>
      </OKShareButton>
      <PinterestShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <PinterestIcon className="shareOptionIcon" /> <span>Pinterest</span>
      </PinterestShareButton>
      <PocketShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <PocketIcon className="shareOptionIcon" /> <span>Pocket</span>
      </PocketShareButton>
      <RedditShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <RedditIcon className="shareOptionIcon" /> <span>Reddit</span>
      </RedditShareButton>
      <TelegramShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <TelegramIcon className="shareOptionIcon" /> <span>Telegram</span>
      </TelegramShareButton>
      <TumblrShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <TumblrIcon className="shareOptionIcon" /> <span>Tumblr</span>
      </TumblrShareButton>
      <TwitterShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <TwitterIcon className="shareOptionIcon" /> <span>Twitter</span>
      </TwitterShareButton>
      <ViberShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <ViberIcon className="shareOptionIcon" /> <span>Viber</span>
      </ViberShareButton>
      <VKShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <VKIcon className="shareOptionIcon" /> <span>VK</span>
      </VKShareButton>
      <WhatsappShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <WhatsappIcon className="shareOptionIcon" /> <span>Whatsapp</span>
      </WhatsappShareButton>
      <WorkplaceShareButton
        className="shareOptionContainer"
        url="https://github.com/NirjharSingha/Equity_for_All"
      >
        <WorkplaceIcon className="shareOptionIcon" /> <span>Workplace</span>
      </WorkplaceShareButton>
    </div>
  );
};

export default Share;
