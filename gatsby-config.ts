import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://retire.guru`,
  },
  // pathPrefix: "/retire.guru",
  graphqlTypegen: true,
};

export default config;
