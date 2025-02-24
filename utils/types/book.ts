export interface MetaDataTable {
  index: string;
  content: string;
}

export interface FetchData {
  metadataTable: MetaDataTable[];
  content: string;
}