const { use } = require("../../config/routes");
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const encryptPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  } catch (err) {
    return err;
  }
}

const comparePassword = async (password, encryptedPassword) => {
  try {
    const result = await bcrypt.compare(password, encryptedPassword);
    return result;
  } catch (err) {
    return err;
  }
}

const createToken = (payload) => {
  return jwt.sign(payload, "secret");
}

module.exports = {
  async create(requestBody) {
    const { name, email, password } = requestBody;

    const encryptedPassword = await encryptPassword(password);

    console.log("encryptedPassword", encryptedPassword);

    return userRepository.create({ name, email, encryptedPassword });
  },

  async login(requestBody) {
    const { email, password } = requestBody;

    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      return {
        isValid: false,
        message: "Email not found",
        data: null
      }
    }

    const isPasswordCorrect = await comparePassword(password, user.encryptedPassword)

    if (!isPasswordCorrect) {
      return {
        isValid: false,
        message: "Wrong Password",
        data: null
      }
    }

    const token = createToken({
      id: user.id,
      name: user.name,
      email: user.email
    })

    user.token = token;

    if (isPasswordCorrect) {
      return {
        isValid: true,
        message: "",
        data: user
      }
    }

  },

  update(id, requestBody) {
    return userRepository.update(id, requestBody);
  },


  delete(id) {
    return userRepository.delete(id);
  },

  async list() {
    try {
      const users = await userRepository.findAll();
      const userCount = await userRepository.getTotalPost();

      return {
        data: users,
        count: userCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return userRepository.find(id);
  },
};
