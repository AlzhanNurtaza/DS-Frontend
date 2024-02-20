export type AxonAttribute = {
    refNumber: string;
    name: string;
    systemName: string;
    description: string;
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string;
  };
  
  export type AxonDataItem = {
    id: number;
    attributes: AxonAttribute;
  };
  
  export type AxonData = {
    data: AxonDataItem[];
  };

  export type AreaTooltipData = {
    title?:string
  };

 