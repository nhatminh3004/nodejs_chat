const router = require("express").Router();
const UserLong = require("../model/longSchema");
router.get("/getAll", async (req, res, next) => {
  try {
    const users = await UserLong.find().select([
      "name",
      "email",
      "phone",
      "_id",
    ]);

    const arrayLength = users.length;
    return res.json({ users, length: arrayLength });
  } catch (error) {
    next(error);
  }
});

router.post("/addNew", async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, phone, email } = req.body;

    const user = await UserLong.create({
      name,
      phone,
      email,
    });
    await user.save();
    return res.json({ status: true, user, messege: "Crete New User Success" });
  } catch (error) {
    if (error.keyPattern.email === 1) {
      return res.json({ status: false, messege: "Email đã tồn tại" });
    } else if (error.keyPattern.phone === 1) {
      return res.json({ status: false, messege: "Số điện thoại đã tồn tại" });
    }
    // console.log(error);
    // console.log(error.keyPattern.email);
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, phone, email } = req.body;
    const userLong = await UserLong.findOne({ phone });
    const updatedInfo = {
      name: name,
      email: email,
    };
    // Cập nhật thông tin người dùng
    Object.assign(userLong, updatedInfo);

    // Lưu lại thay đổi
    await userLong.save();
    return res.json({ status: true, messege: "Update Success" });
  } catch (error) {
    next(error);
  }
});
router.delete("/delete", async (req, res, next) => {
  try {
    const { _id } = req.body;

    // Xóa user theo ID
    await UserLong.findByIdAndDelete(_id);

    res.json({ message: "Xóa user thành công!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
