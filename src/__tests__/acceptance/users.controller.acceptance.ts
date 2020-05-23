import { Client } from "@loopback/testlab";
import { expect, use } from "chai";
import chaiEach from "chai-each";
import { GithubApiExperimentApplication } from "../..";
import { setupApplication } from "./test-helper";

use(chaiEach);

describe("UsersController", () => {
  let app: GithubApiExperimentApplication;
  let client: Client;

  before("setupApplication", async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it("invokes GET /users", async function () {
    this.timeout(5000);

    const res = await client.get("/users").expect(200);

    expect(res.body)
      .to.be.an("object")
      .and.have.keys("users", "next")
      .and.with.property("users")
      .to.have.lengthOf.above(0)
      .and.each.have.keys(
        "login",
        "id",
        "node_id",
        "avatar_url",
        "gravatar_id",
        "url",
        "html_url",
        "followers_url",
        "following_url",
        "gists_url",
        "starred_url",
        "subscriptions_url",
        "organizations_url",
        "repos_url",
        "events_url",
        "received_events_url",
        "type",
        "site_admin",
      );

    expect(res.body)
      .to.have.key("next")
      .that.matches(/https:\/\/api\.github\.com\/users\?since=/);
  });
});
