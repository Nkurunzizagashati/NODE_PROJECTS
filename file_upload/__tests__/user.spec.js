import { json } from "express";
import { registerUser } from "../controllers/user.js";
import * as validator from "express-validator";

jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "Invalid username" }]),
  })),

  matchedData: jest.fn(() => ({
    firstname: "test",
    lastname: "User",
    email: "test@example.com",
    password: "Test12",
  })),
}));

const mockResponse = {
  status: jest.fn(() => mockResponse),
  sendStatus: jest.fn(),
  send: jest.fn(),
  json: jest.fn(),
};

describe("register user", () => {
  const mockRequest = {};
  it("should return status of 400 if invalid user information are given", async () => {
    await registerUser(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalled();
    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
