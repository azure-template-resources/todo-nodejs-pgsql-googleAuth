export interface TodoItem {
    id: number;
    description: string;
  }

  export interface Identity{
    clientPrincipal: ClientPrincipal
  }

  export interface ClientPrincipal{
    identityProvider: string;
    userId: string;
    userDetails: string;
    userRoles: string[];
  }
