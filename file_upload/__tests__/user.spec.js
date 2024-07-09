import { registerUser, loginUser, getAllUsers } from "../controllers/user.js";
import * as validator from "express-validator";
import bcryptjs from "bcryptjs";
import User from "../models/user.js";

jest.mock("express-validator", () => ({
  validationResult: jest.fn(),
  matchedData: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("../models/user.js");
jest.mock("../utils/errorHandler.js", () => jest.fn());

const mockResponse = {
  status: jest.fn(() => mockResponse),
  sendStatus: jest.fn(),
  send: jest.fn(),
  json: jest.fn(),
};

let mockRequest;

beforeEach(() => {
  mockRequest = {
    body: {},
    session: {},
  };
});

describe("registerUser", () => {
  it("should return status 400 if invalid user information is given", async () => {
    validator.validationResult.mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => false),
      array: jest.fn(() => [{ msg: "Invalid username" }]),
    }));

    await registerUser(mockRequest, mockResponse);

    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("should return status 201 and the user created if valid user information is given", async () => {
    validator.validationResult.mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    validator.matchedData.mockImplementationOnce(() => ({
      firstname: "test",
      lastname: "User",
      email: "test@example.com",
      password: "Test12",
    }));

    bcryptjs.genSalt.mockImplementationOnce(() => "salt");
    bcryptjs.hash.mockImplementationOnce(() => "hashedPassword");
    User.create.mockImplementationOnce(() => ({
      firstname: "test",
      lastname: "User",
      email: "test@example.com",
      password: "hashedPassword",
    }));

    await registerUser(mockRequest, mockResponse);

    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "User registered successfully!",
      newUser: {
        firstname: "test",
        lastname: "User",
        email: "test@example.com",
      },
    });
  });
});

describe("loginUser", () => {
  it("should return status 400 if invalid login information is given", async () => {
    validator.validationResult.mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => false),
      array: jest.fn(() => [{ msg: "Invalid login information" }]),
    }));

    await loginUser(mockRequest, mockResponse);

    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("should return status 401 if the email is incorrect", async () => {
    validator.validationResult.mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    validator.matchedData.mockImplementationOnce(() => ({
      email: "incorrect@example.com",
      password: "Test12",
    }));

    User.findOne.mockImplementationOnce(() => null);

    await loginUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Incorect email or password",
    });
  });

  it("should return status 401 if the password is incorrect", async () => {
    validator.validationResult.mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    validator.matchedData.mockImplementationOnce(() => ({
      email: "test@example.com",
      password: "incorrect",
    }));

    User.findOne.mockImplementationOnce(() => ({
      email: "test@example.com",
      password: "hashedPassword",
    }));

    bcryptjs.compare.mockImplementationOnce(() => false);

    await loginUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Incorrect email or password",
    });
  });

  it("should return status 200 if login is successful", async () => {
    validator.validationResult.mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    validator.matchedData.mockImplementationOnce(() => ({
      email: "test@example.com",
      password: "Test12",
    }));

    User.findOne.mockImplementationOnce(() => ({
      email: "test@example.com",
      password: "hashedPassword",
    }));

    bcryptjs.compare.mockImplementationOnce(() => true);

    await loginUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "User Loged in successfully!",
    });
  });
});

describe("getAllUsers", () => {
  it("should return status 403 if the user is not an admin", async () => {
    mockRequest.session.user = { isAdmin: false };

    await getAllUsers(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "You are not allowed to perform this action",
    });
  });

  it("should return status 200 and the list of users if the user is an admin", async () => {
    mockRequest.session.user = { isAdmin: true };

    User.find.mockImplementationOnce(() => [
      { firstname: "John", lastname: "Doe", email: "john@example.com" },
      { firstname: "Jane", lastname: "Doe", email: "jane@example.com" },
    ]);

    await getAllUsers(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      users: [
        { firstname: "John", lastname: "Doe", email: "john@example.com" },
        { firstname: "Jane", lastname: "Doe", email: "jane@example.com" },
      ],
    });
  });
});
