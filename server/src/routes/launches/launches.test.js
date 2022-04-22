const request = require("supertest");
const app = require("../../app");
describe("Get /launch", () => {
  test("It should respond 200", async () => {
    const response = await request(app)
      .get("/launch")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});
describe("Post /launch", () => {
  const data = {
    mission: "VI",
    rocket: "VI143",
    target: "Mars",
    launchDate: "March 8, 2002",
  };
  const InvalidData = {
    mission: "VI",
    rocket: "VI143",
    target: "Mars",
    launchDate: "March",
  };
  const dataWithoutDate = {
    mission: "VI",
    rocket: "VI143",
    target: "Mars",
  };
  test("It should respond 200", async () => {
    const respones = await request(app)
      .post("/launch")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(201);
    const requestDate = new Date(data.launchDate).valueOf();
    const responseDate = new Date(respones.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    expect(respones.body).toMatchObject(dataWithoutDate);
  });
  test("Missing properties", async () => {
    const respones = await request(app)
      .post("/launch")
      .send(dataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(respones.body).toStrictEqual({
      error: "Please fill all details",
    });
  });
  test("Invalid date", async () => {
    const respones = await request(app)
      .post("/launch")
      .send(InvalidData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(respones.body).toStrictEqual({
      error: "Invalid Date",
    });
  });
});
