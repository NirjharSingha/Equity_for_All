import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

console.log("CLIENT_ID:", process.env.CLIENT_ID); // Add this line
console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET); // Add this line

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "627302448889-r826sjvkdrbgr8ho9es3s5s036i08shc.apps.googleusercontent.com", // Make sure CLIENT_ID is set in your environment variables
      clientSecret: "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", // Make sure CLIENT_SECRET is set in your environment variables
      callbackURL: "http://localhost:5000/user/google/callback/login",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log("inside passport");
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
