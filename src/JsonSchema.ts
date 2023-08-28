export type JsonSchema = {
  [key: string]: {
    type: string;
    properties?: {
      [key: string]: {
        type: string;
      };
    };
    required?: string[];
  };
};