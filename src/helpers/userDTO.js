const  UserDtoPresenter  = (user) => {

    const userDto = {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        created_at: user.created_at
      };

      return userDto;
}

export default UserDtoPresenter;