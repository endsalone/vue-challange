import { defineStore } from "pinia";
import { ref } from "vue";
import type { Participant, ParticipantStore } from "./participants.type";

export const useParticipantsStore = defineStore("participants", () => {
  const defaultUrl = "https://data.sandbox.directory.openbankingbrasil.org.br/participants";
  const participantsUrl = ref<string>(defaultUrl);
  const participants = ref<ParticipantStore[]>([]);

  const loadParticipants = async (url?: string) => {
    const data = await fetch(url ?? participantsUrl.value, {
      headers: {
        "x-fapi-interaction-id": "73cac523-d3ae-2289-b106-330a6218710d",
      },
    });

    const result: Participant[] = await data.json();

    const apiResources: ParticipantStore[] = result.flatMap((item) => {
      return item.AuthorisationServers.flatMap((server) => {
        return server.ApiResources?.map((resource) => {
          return {
            apiFamilyType: resource.ApiFamilyType,
            apiResourceId: resource.ApiResourceId,
            apiCertificationUri: resource.ApiCertificationUri,
            familyComplete: resource.FamilyComplete,
            imageUrl: server.CustomerFriendlyLogoUri,
            legalEntityName: item.LegalEntityName,
          };
        });
      });
    });

    participants.value = apiResources;
  };

  return { participants, participantsUrl, loadParticipants };
});
