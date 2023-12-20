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

const Share = ({ post }) => {
  useEffect(() => {
    console.log("share component loaded");
  }, []);

  const shareUrl = `${import.meta.env.VITE_CLIENT_URL}share/${post._id}`;

  return (
    <div className="shareComponent">
      <div className="shareOptionDiv">
        <EmailShareButton className="shareOptionContainer" url={shareUrl}>
          <EmailIcon className="shareOptionIcon" /> <span>Email</span>
        </EmailShareButton>
      </div>
      <div className="shareOptionDiv">
        <FacebookShareButton className="shareOptionContainer" url={shareUrl}>
          <FacebookIcon className="shareOptionIcon" /> <span>Facebook</span>
        </FacebookShareButton>
      </div>
      <div className="shareOptionDiv">
        <FacebookMessengerShareButton
          className="shareOptionContainer"
          url={shareUrl}
        >
          <FacebookMessengerIcon className="shareOptionIcon" />{" "}
          <span>Messenger</span>
        </FacebookMessengerShareButton>
      </div>
      <div className="shareOptionDiv">
        <HatenaShareButton className="shareOptionContainer" url={shareUrl}>
          <HatenaIcon className="shareOptionIcon" /> <span>Hatena</span>
        </HatenaShareButton>
      </div>
      <div className="shareOptionDiv">
        <InstapaperShareButton className="shareOptionContainer" url={shareUrl}>
          <InstapaperIcon className="shareOptionIcon" /> <span>Instapaper</span>
        </InstapaperShareButton>
      </div>
      <div className="shareOptionDiv">
        <LineShareButton className="shareOptionContainer" url={shareUrl}>
          <LineIcon className="shareOptionIcon" /> <span>Line</span>
        </LineShareButton>
      </div>
      <div className="shareOptionDiv">
        <LinkedinShareButton className="shareOptionContainer" url={shareUrl}>
          <LinkedinIcon className="shareOptionIcon" /> <span>Linkedin</span>
        </LinkedinShareButton>
      </div>
      <div className="shareOptionDiv">
        <LivejournalShareButton className="shareOptionContainer" url={shareUrl}>
          <LivejournalIcon className="shareOptionIcon" />{" "}
          <span>Livejournal</span>
        </LivejournalShareButton>
      </div>
      <div className="shareOptionDiv">
        <MailruShareButton className="shareOptionContainer" url={shareUrl}>
          <MailruIcon className="shareOptionIcon" /> <span>Mailru</span>
        </MailruShareButton>
      </div>
      <div className="shareOptionDiv">
        <OKShareButton className="shareOptionContainer" url={shareUrl}>
          <OKIcon className="shareOptionIcon" /> <span>OK</span>
        </OKShareButton>
      </div>
      <div className="shareOptionDiv">
        <PinterestShareButton className="shareOptionContainer" url={shareUrl}>
          <PinterestIcon className="shareOptionIcon" /> <span>Pinterest</span>
        </PinterestShareButton>
      </div>
      <div className="shareOptionDiv">
        <PocketShareButton className="shareOptionContainer" url={shareUrl}>
          <PocketIcon className="shareOptionIcon" /> <span>Pocket</span>
        </PocketShareButton>
      </div>
      <div className="shareOptionDiv">
        <RedditShareButton className="shareOptionContainer" url={shareUrl}>
          <RedditIcon className="shareOptionIcon" /> <span>Reddit</span>
        </RedditShareButton>
      </div>
      <div className="shareOptionDiv">
        <TelegramShareButton className="shareOptionContainer" url={shareUrl}>
          <TelegramIcon className="shareOptionIcon" /> <span>Telegram</span>
        </TelegramShareButton>
      </div>
      <div className="shareOptionDiv">
        <TumblrShareButton className="shareOptionContainer" url={shareUrl}>
          <TumblrIcon className="shareOptionIcon" /> <span>Tumblr</span>
        </TumblrShareButton>
      </div>
      <div className="shareOptionDiv">
        <TwitterShareButton className="shareOptionContainer" url={shareUrl}>
          <TwitterIcon className="shareOptionIcon" /> <span>Twitter</span>
        </TwitterShareButton>
      </div>
      <div className="shareOptionDiv">
        <ViberShareButton className="shareOptionContainer" url={shareUrl}>
          <ViberIcon className="shareOptionIcon" /> <span>Viber</span>
        </ViberShareButton>
      </div>
      <div className="shareOptionDiv">
        <VKShareButton className="shareOptionContainer" url={shareUrl}>
          <VKIcon className="shareOptionIcon" /> <span>VK</span>
        </VKShareButton>
      </div>
      <div className="shareOptionDiv">
        <WhatsappShareButton className="shareOptionContainer" url={shareUrl}>
          <WhatsappIcon className="shareOptionIcon" /> <span>Whatsapp</span>
        </WhatsappShareButton>
      </div>
      <div className="shareOptionDiv">
        <WorkplaceShareButton className="shareOptionContainer" url={shareUrl}>
          <WorkplaceIcon className="shareOptionIcon" /> <span>Workplace</span>
        </WorkplaceShareButton>
      </div>
    </div>
  );
};

export default Share;
