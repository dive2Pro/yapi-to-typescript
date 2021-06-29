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
  const apiUrl = `${baseUrl}api/plugin/export?type=json&pid=${projectId}&status=all&isWiki=false`;
  let apiCollection = await request.get(apiUrl);
  return apiCollection;
}
