type apiResponse = {
  message?: string;
  statusCode: number;
  data?: {
    name: string;
    uuid: string;
    iat: number;
    exp: number;
  };
};
