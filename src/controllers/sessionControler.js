

const registerUser = async (req, res) => {
    try {
     const user = req.user;
     return res.json({
      user
     })
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  const loginUser = async (req, res) => {
    try {
     req.session.user = {
        _id: req.user._id,
        name: req.user.name,
        surname: req.user.surname,
        nick: req.user.nick,
        email: req.user.email,
        image: req.user.image,
     }
      return res.redirect('/');
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
          });
    }
  };

  export default {
    registerUser,
    loginUser
  }