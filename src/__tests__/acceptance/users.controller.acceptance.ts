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
    const res = await client.get("/users?since=5").expect(200);

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
      .to.have.property("next")
      .that.matches(/https:\/\/api\.github\.com\/users\?since=/);
  });

  it("invokes GET /users/{username}", async function () {
    const username = "ry";
    const res = await client.get(`/users/${username}`).expect(200);

    expect(res.body)
      .to.be.an("object")
      .and.have.keys(
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
        "name",
        "company",
        "blog",
        "location",
        "email",
        "hireable",
        "bio",
        "public_repos",
        "public_gists",
        "followers",
        "following",
        "created_at",
        "updated_at",
      );
  });

  it("invokes GET /users/{username}/repos", async function () {
    const username = "ry";
    const res = await client.get(`/users/${username}/repos`).expect(200);

    expect(res.body)
      .to.be.an("array")
      .to.have.lengthOf.above(0)
      .and.each.have.keys(
        "id",
        "node_id",
        "name",
        "full_name",
        "private",
        "owner",
        "html_url",
        "description",
        "fork",
        "url",
        "forks_url",
        "keys_url",
        "collaborators_url",
        "teams_url",
        "hooks_url",
        "issue_events_url",
        "events_url",
        "assignees_url",
        "branches_url",
        "tags_url",
        "blobs_url",
        "git_tags_url",
        "git_refs_url",
        "trees_url",
        "statuses_url",
        "languages_url",
        "stargazers_url",
        "contributors_url",
        "subscribers_url",
        "subscription_url",
        "commits_url",
        "git_commits_url",
        "comments_url",
        "issue_comment_url",
        "contents_url",
        "compare_url",
        "merges_url",
        "archive_url",
        "downloads_url",
        "issues_url",
        "pulls_url",
        "milestones_url",
        "notifications_url",
        "labels_url",
        "releases_url",
        "deployments_url",
        "created_at",
        "updated_at",
        "pushed_at",
        "git_url",
        "ssh_url",
        "clone_url",
        "svn_url",
        "homepage",
        "size",
        "stargazers_count",
        "watchers_count",
        "language",
        "has_issues",
        "has_projects",
        "has_downloads",
        "has_wiki",
        "has_pages",
        "forks_count",
        "mirror_url",
        "archived",
        "disabled",
        "open_issues_count",
        "license",
        "forks",
        "open_issues",
        "watchers",
        "default_branch",
      );
  });
});
