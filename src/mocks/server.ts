import { populationCompositionHandler } from "@/backend/handlers/population-composition-handler";
import { prefecturesHandler } from "@/backend/handlers/prefectures-handler";
import { setupServer } from "msw/node";

export const APIServer = setupServer(
  prefecturesHandler,
  populationCompositionHandler
);
