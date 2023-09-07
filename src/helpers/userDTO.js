const  UserDtoPresenter  = (user) => {

    const userDto = {
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