module.exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user)
      return res.json({ msg: "Incorrect phone or password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect phone or password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, phone, email, password, gender } = req.body;
    const phoneCheck = await User.findOne({ phone });
    if (phoneCheck)
      return res.json({ msg: "Phone number already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      phone,
      email,
      username,
      password: hashedPassword,
      gender,
    });
    delete user.password;
    await user.save();
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
