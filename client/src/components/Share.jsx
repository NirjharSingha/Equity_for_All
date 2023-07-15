import React from "react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

// const ShareButton = () => {
//   const handleShare = async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: "Example Share",
//           text: "Check out this cool content!",
//           url: "https://example.com",
//         });
//         console.log("Shared successfully");
//       } else {
//         console.log("Web Share API not supported");
//       }
//     } catch (error) {
//       console.error("Error sharing:", error);
//     }
//   };

//   return <button onClick={handleShare}>Share</button>;
// };

const ShareButtons = () => {
  const shareUrl = "https://github.com/NirjharSingha/School_Management_System";
  const title = "Check out this amazing website!";

  return (
    <div>
      <FacebookShareButton url={shareUrl} quote={title}>
        Share on Facebook
      </FacebookShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        Share on Twitter
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
