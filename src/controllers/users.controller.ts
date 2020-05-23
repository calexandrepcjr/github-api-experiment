// Uncomment these imports to begin using these cool features!

import { inject, service } from "@loopback/core";
import { get, param, Request, RestBindings } from "@loopback/rest";
import { GithubUserService } from "../services/contracts/github-user-service";
import { GithubUserProvider } from "../services/github-user.service";

export class UsersController {
  constructor(
    @service(GithubUserProvider)
    public githubUserService: GithubUserService,
    @inject(RestBindings.Http.REQUEST) private req: Request,
  ) {}

  @get("/users", {
    responses: {
      "200": {
        description:
          "This endpoint must return a list of GitHub users and the link for the next page. ",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                users: {
                  description: "List of Github users",
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                next: {
                  description: "Next users page URL",
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  })
  async since(@param.query.number("since") since: number): Promise<object> {
    const users = await this.githubUserService.since(since);

    return {
      users: users.body,
      next: this.nextLink(users.headers.link.toString()),
    };
  }

  private nextLink(link: string): string {
    return link.split(";")[0].replace(/<|>/gi, "");
  }
}
