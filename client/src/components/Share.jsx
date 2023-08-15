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

  const shareUrl = `http://localhost:5173/share/${post._id}`;

  return (
    <div className="shareComponent">
      <EmailShareButton className="shareOptionContainer" url={shareUrl}>
        <EmailIcon className="shareOptionIcon" /> <span>Email</span>
      </EmailShareButton>
      <FacebookShareButton className="shareOptionContainer" url={shareUrl}>
        <FacebookIcon className="shareOptionIcon" /> <span>Facebook</span>
      </FacebookShareButton>
      <FacebookMessengerShareButton
        className="shareOptionContainer"
        url={shareUrl}
      >
        <FacebookMessengerIcon className="shareOptionIcon" />{" "}
        <span>Messenger</span>
      </FacebookMessengerShareButton>
      <HatenaShareButton className="shareOptionContainer" url={shareUrl}>
        <HatenaIcon className="shareOptionIcon" /> <span>Hatena</span>
      </HatenaShareButton>
      <InstapaperShareButton className="shareOptionContainer" url={shareUrl}>
        <InstapaperIcon className="shareOptionIcon" /> <span>Instapaper</span>
      </InstapaperShareButton>
      <LineShareButton className="shareOptionContainer" url={shareUrl}>
        <LineIcon className="shareOptionIcon" /> <span>Line</span>
      </LineShareButton>
      <LinkedinShareButton className="shareOptionContainer" url={shareUrl}>
        <LinkedinIcon className="shareOptionIcon" /> <span>Linkedin</span>
      </LinkedinShareButton>
      <LivejournalShareButton className="shareOptionContainer" url={shareUrl}>
        <LivejournalIcon className="shareOptionIcon" /> <span>Livejournal</span>
      </LivejournalShareButton>
      <MailruShareButton className="shareOptionContainer" url={shareUrl}>
        <MailruIcon className="shareOptionIcon" /> <span>Mailru</span>
      </MailruShareButton>
      <OKShareButton className="shareOptionContainer" url={shareUrl}>
        <OKIcon className="shareOptionIcon" /> <span>OK</span>
      </OKShareButton>
      <PinterestShareButton className="shareOptionContainer" url={shareUrl}>
        <PinterestIcon className="shareOptionIcon" /> <span>Pinterest</span>
      </PinterestShareButton>
      <PocketShareButton className="shareOptionContainer" url={shareUrl}>
        <PocketIcon className="shareOptionIcon" /> <span>Pocket</span>
      </PocketShareButton>
      <RedditShareButton className="shareOptionContainer" url={shareUrl}>
        <RedditIcon className="shareOptionIcon" /> <span>Reddit</span>
      </RedditShareButton>
      <TelegramShareButton className="shareOptionContainer" url={shareUrl}>
        <TelegramIcon className="shareOptionIcon" /> <span>Telegram</span>
      </TelegramShareButton>
      <TumblrShareButton className="shareOptionContainer" url={shareUrl}>
        <TumblrIcon className="shareOptionIcon" /> <span>Tumblr</span>
      </TumblrShareButton>
      <TwitterShareButton className="shareOptionContainer" url={shareUrl}>
        <TwitterIcon className="shareOptionIcon" /> <span>Twitter</span>
      </TwitterShareButton>
      <ViberShareButton className="shareOptionContainer" url={shareUrl}>
        <ViberIcon className="shareOptionIcon" /> <span>Viber</span>
      </ViberShareButton>
      <VKShareButton className="shareOptionContainer" url={shareUrl}>
        <VKIcon className="shareOptionIcon" /> <span>VK</span>
      </VKShareButton>
      <WhatsappShareButton className="shareOptionContainer" url={shareUrl}>
        <WhatsappIcon className="shareOptionIcon" /> <span>Whatsapp</span>
      </WhatsappShareButton>
      <WorkplaceShareButton className="shareOptionContainer" url={shareUrl}>
        <WorkplaceIcon className="shareOptionIcon" /> <span>Workplace</span>
      </WorkplaceShareButton>
    </div>
  );
};

export default Share;
