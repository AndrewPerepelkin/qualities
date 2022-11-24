import httpService from "./httpService";
const qualityEndpoint = "quality/";

const qualityService = {
    get: async (id) => {
  const { data } = await httpService.get(qualityEndpoint + id);
    return data;
  },
  update: async (id, content) => {
    const { data } = await httpService.put(qualityEndpoint + id, content)
    return data;
  },
  fetchAll: async () => {
    const { data } = await httpService.get(qualityEndpoint);
    return data;
  }
}
export default qualityService;
