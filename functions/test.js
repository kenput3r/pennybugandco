"use strict"
exports.handler = async function () {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Test succeeded" }),
  }
}
