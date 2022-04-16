export interface Hosts {
  [hostName: string]: PortalType[];
}

export interface PortalType {
  key: string;
  node: React.ReactNode;
}
