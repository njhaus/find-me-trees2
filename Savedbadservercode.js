// non-working passport stuff
// index.mjs setup
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne(
        { username: username },
        "username salt hashed_password"
      );
      console.log("USER IS");
      console.log(user);
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password" });
      }
      // const hashBuffer = Buffer.from(user.hashed_password, "utf8");
      // const sizedBuffer = Buffer.byteLength(hashBuffer);
      // console.log('USER HASH LENGTH');
      // console.log(hashBuffer);

      // Compare the provided password with the hashed password stored in the user object
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            return cb(err);
          }
          if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
            console.log("no match");
            return cb(null, false, {
              message: "Incorrect username or password",
            });
          }
          console.log("I think this worked");
          return cb(null, user);
        }
      );
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Route setup -- register

const salt = crypto.randomBytes(16);

crypto.pbkdf2(
  req.body.password,
  salt,
  310000,
  32,
  "sha256",
  async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    try {
      const newUser = new User({
        username: req.body.username,
        hashed_password: hashedPassword.toString("hex"), // Convert hashedPassword to a hexadecimal string
        salt: salt.toString("hex"), // Convert salt to a hexadecimal string
      });

      await newUser.save(); // Save the new user to the database

      // If saving is successful, log in the user
      req.login(newUser, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    } catch (err) {
      let errMsg = "Error registering. Please try again later.";
      if (err.code && err.code === 11000)
        errMsg =
          "There is already an account associated with this email address.";
      console.log(errMsg);
      return next(err);
    }
  }
);