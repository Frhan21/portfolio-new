export type TResponseItem<T> = {
  status_code: number;
  message: string;
  data: T;
};

export type TResponsePaginate<T> = {
  status_code: number;
  message: string;
  data: {
    items: T[];
    meta: {
      total: number;
      page: number;
      totalPages: number;
    };
  };
};

export type TResponseError = {
  status_code: number;
  message: string;
  error?: unknown;
};
