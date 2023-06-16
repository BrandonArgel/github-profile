type RateCore = {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
  resource: string;
};

export type RateLimitModel = {
  resources: {
    core: RateCore;
    graphql: RateCore;
    integration_manifest: RateCore;
    search: RateCore;
  };
  rate: RateCore;
};

export type RateLimitUserModel = {
  limit: number;
  remaining: number;
  reset: number;
}