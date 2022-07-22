import { noteControllerConfiguration } from "../../../configuration/configuration";
import {
  HttpRequest,
  HttpRequestHandler,
  HttpResponse,
} from "../../../http/http";
import { DateRangeHtmlView } from "../../../views/note/date-range/date-range-html-view";

export const getNewDateRangeHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const configuration = noteControllerConfiguration({});
  const view = new DateRangeHtmlView({
    ...configuration,
    notebookID: request.pathParameters.notebookID,
  });
  return view.renderCreationFormOneEntity();
};
