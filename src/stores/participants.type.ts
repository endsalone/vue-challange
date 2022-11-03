export type ApiResource = {
  ApiCertificationUri: string;
  ApiFamilyType: string;
  ApiResourceId: string;
  FamilyComplete: string;
};

export type Participant = {
  LegalEntityName: string;
  AuthorisationServers: {
    CustomerFriendlyLogoUri: string;
    ApiResources: ApiResource[] | null;
  }[];
};

export type ParticipantStoreValue = {
  apiFamilyType: string;
  apiResourceId: string;
  apiCertificationUri: string;
  familyComplete: string;
  imageUrl: string;
  legalEntityName: string;
};

export type ParticipantStore = ParticipantStoreValue | undefined;
