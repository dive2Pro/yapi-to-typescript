import { ApiCollection, ProjectConfig, RequestDefailt } from "./types";
import throwError from "./throwError";

export default async function fetchApiCollection(
  config: ProjectConfig,
  request: RequestDefailt
): Promise<ApiCollection> {
  const matches = config.projectUrl.match(/(.+\/)project\/(\d+)\//);
  if (!matches) {
    return throwError("无法解析 projectUrl，请检查是否有误。");
  }
  const [, baseUrl, projectId] = matches;
  let apiCollection = await request.get(config.projectUrl);
  return apiCollection;
}
